from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from pymongo import MongoClient
from dotenv import load_dotenv
from pymongo.errors import ConnectionFailure
import os

# Load .env variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# JWT config
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# MongoDB connection
try:
    client = MongoClient(os.getenv("MONGO_URI"))
    client.admin.command('ping')  # Test connection
    print("MongoDB connected successfully!")
except ConnectionFailure as e:
    print("MongoDB connection failed:", e)

# Collections
db = client['voicecards']
users = db['users']

# -------------------- ROUTES --------------------

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })
    return jsonify({"message": "Registered successfully!"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user["_id"]))
    return jsonify({"token": token, "name": user["name"]})


@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hello user {user_id}, you are authenticated!"})

# -------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      alert('Login successful!');
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { name, email, password });
      alert('Registration successful! You can now log in.');
      setMode('login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(248, 233, 233)',
        backgroundImage: 'url("/Online.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        style={{
          transform: 'translateX(-250px)',
          width: '90%',
          maxWidth: '400px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          animation: 'fadeInSlide 0.6s ease-out',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </h2>

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '70%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            /><br /><br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '70%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            /><br /><br />
            <button type="submit">Login</button>
            <p style={{ color: 'black',fontSize: '20px' }}>
              Don't have an account?{' '}
              <span onClick={() => setMode('register')} style={{ color: 'black', cursor: 'pointer',fontSize: '20px' }}>
                Register
              </span>
            </p>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '70%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            /><br /><br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '70%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            /><br /><br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '70%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            /><br /><br />
            <button type="submit">Register</button>
            <p style={{ color: 'black',fontSize: '20px' }}>
              Already have an account?{' '}
              <span onClick={() => setMode('login')} style={{ color: 'black', cursor: 'pointer',fontSize: '20px' }}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

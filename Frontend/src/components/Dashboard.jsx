import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const containerStyle = {
    height: '100vh',               // Full screen height
    width: '100vw',                // Full screen width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    padding: '40px',
    boxSizing: 'border-box',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '30px',
  };

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  };

  const handleHover = (e, hover) => {
    e.target.style.backgroundColor = hover ? '#dfe9f3' : '#ffffff';
    e.target.style.transform = hover ? 'scale(1.05)' : 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <h1> Welcome to VoiceCards</h1>
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate('/add')}
        >
           Add
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate('/create')}
        >
           Create Cards
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate('/get')}
        >
           Get Cards
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

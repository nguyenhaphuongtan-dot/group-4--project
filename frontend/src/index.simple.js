import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple test app
const SimpleApp = () => {
  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#007bff' }}>🚀 Group 4 Project</h1>
      <p>Website đang hoạt động!</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            background: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Đi đến Đăng nhập
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SimpleApp />);
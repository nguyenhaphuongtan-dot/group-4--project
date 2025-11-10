/**
 * Simple App with Redux and Router
 * Step by step implementation
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Simple Login Page
const LoginPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🔐 Đăng nhập</h1>
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="Email"
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <input 
          type="password" 
          placeholder="Mật khẩu"
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          style={{
            width: '100%',
            padding: '12px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

// Simple Home Page
const HomePage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🏠 Trang chủ</h1>
      <p>Chào mừng đến với Group 4 Project!</p>
      <button 
        onClick={() => window.location.href = '/login'}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Đến trang Login
      </button>
    </div>
  );
};

// Main App Component
const SimpleApp = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default SimpleApp;
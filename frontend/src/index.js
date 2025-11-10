import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Simple App với Redux để test
const SimpleReduxApp = () => {
  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#007bff', marginBottom: '20px' }}>🚀 Group 4 Project - Redux Version</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>Website với Redux đang hoạt động!</p>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>✅ Redux Store loaded</strong></p>
        <p><strong>✅ Provider configured</strong></p>
        <p><strong>✅ Ready for full app</strong></p>
      </div>
      <div>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            background: '#007bff',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          Đến trang Login
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#28a745',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SimpleReduxApp />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

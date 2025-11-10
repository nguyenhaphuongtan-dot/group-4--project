import React, { useState, useEffect } from 'react';

function TestConnection() {
  const [status, setStatus] = useState('Đang kiểm tra...');
  const [error, setError] = useState('');
  const [backendUrl] = useState('https://group4-backend-api.onrender.com');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('Đang kết nối tới backend...');
      
      // Test simple health check
      const response = await fetch(`${backendUrl}/health`);
      
      if (response.ok) {
        setStatus('✅ Kết nối backend thành công!');
      } else {
        setStatus(`❌ Backend trả về status: ${response.status}`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError(`❌ Lỗi kết nối: ${err.message}`);
      setStatus('❌ Không thể kết nối với backend');
    }
  };

  const testAPI = async () => {
    try {
      setStatus('Đang test API endpoint...');
      const response = await fetch(`${backendUrl}/api/admin/users`);
      
      if (response.ok) {
        const data = await response.json();
        setStatus(`✅ API hoạt động! Có ${data.users?.length || 0} users`);
      } else {
        setStatus(`❌ API trả về: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      setError(`❌ API Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔧 Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Backend URL:</h3>
        <code>{backendUrl}</code>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Status:</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
          border: '1px solid ' + (status.includes('✅') ? '#c3e6cb' : '#f5c6cb')
        }}>
          {status}
        </div>
      </div>
      
      {error && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Error Details:</h3>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            color: '#721c24'
          }}>
            {error}
          </div>
        </div>
      )}
      
      <div>
        <button onClick={testConnection} style={{ marginRight: '10px' }}>
          🔄 Test Health Check
        </button>
        <button onClick={testAPI}>
          🔄 Test API Endpoint
        </button>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Frontend URL: {window.location.href}</p>
        <p>User Agent: {navigator.userAgent}</p>
      </div>
    </div>
  );
}

export default TestConnection;
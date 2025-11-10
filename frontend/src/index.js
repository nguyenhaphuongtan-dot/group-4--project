import React from 'react';
import ReactDOM from 'react-dom/client';

// Temporary simple app to test deployment
const SimpleApp = () => {
  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#007bff', marginBottom: '20px' }}>🚀 Group 4 Project</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>Website đang hoạt động!</p>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>✅ Build successful</strong></p>
        <p><strong>✅ Vercel deployment working</strong></p>
        <p><strong>✅ React app rendering</strong></p>
      </div>
      <div>
        <button 
          onClick={() => alert('Chức năng đang được phát triển!')}
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
          Test Button
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
          Refresh Page
        </button>
      </div>
      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <p>Nếu bạn thấy trang này, nghĩa là Vercel đã deploy thành công!</p>
        <p>Đang khắc phục lỗi để hiển thị app chính...</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SimpleApp />);

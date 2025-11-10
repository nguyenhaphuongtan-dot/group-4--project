import React from 'react';

const TestPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🚀 Website Group 4 Hoạt Động!</h1>
      <p>Nếu bạn thấy trang này, nghĩa là build đã thành công.</p>
      <p>Vui lòng chờ vài phút để hệ thống hoàn tất deploy.</p>
      <div style={{ marginTop: '30px' }}>
        <a href="/login" style={{ 
          background: '#007bff', 
          color: 'white', 
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          Đi đến trang Đăng nhập
        </a>
      </div>
    </div>
  );
};

export default TestPage;
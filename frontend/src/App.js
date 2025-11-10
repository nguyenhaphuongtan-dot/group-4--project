import React, { useState, useEffect } from "react";

function App() {
  const [debug, setDebug] = useState("App component loaded");
  const [showTest, setShowTest] = useState(true);

  useEffect(() => {
    setDebug("App useEffect ran");
    console.log("App component mounted");
  }, []);

  const testConnection = async () => {
    try {
      setDebug("Testing connection...");
      const response = await fetch('https://group4-backend-api.onrender.com/');
      const data = await response.json();
      setDebug("✅ Backend connected: " + data.message);
    } catch (err) {
      setDebug("❌ Connection failed: " + err.message);
    }
  };

  if (showTest) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🔧 Simple Debug Test</h1>
        <div style={{ marginBottom: '20px' }}>
          <strong>Debug Status:</strong> {debug}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={testConnection} style={{ padding: '10px 15px' }}>
            🔄 Test Backend Connection
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setShowTest(false)} style={{ padding: '10px 15px' }}>
            ➡️ Show User Management (Coming Soon)
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          <p>Frontend URL: {window.location.href}</p>
          <p>Current Time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>� Group 4 - User Management</h1>
      <p>Coming Soon... (Under Development)</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowTest(true)} style={{ padding: '10px 15px' }}>
          🔧 Back to Connection Test
        </button>
      </div>
    </div>
  );
}

export default App;

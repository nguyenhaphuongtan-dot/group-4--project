import React, { useState, useEffect } from "react";
import { adminService } from "./services/api";
import API_CONFIG from "./config/api";
import TestConnection from "./TestConnection";

function App() {
  const [showTest, setShowTest] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", fullName: "" });
  const [editingUser, setEditingUser] = useState(null); // User đang sửa
  const [editForm, setEditForm] = useState({ username: "", email: "", fullName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy dữ liệu từ backend API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminService.getUsers();
      setUsers(response.data.users || []);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setError("Không thể kết nối với server. Đang kết nối tới: " + API_CONFIG.BASE_URL);
    } finally {
      setLoading(false);
    }
  };

  // Thêm user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await adminService.createUser(newUser);
      await fetchUsers(); // Refresh danh sách
      setNewUser({ username: "", email: "", fullName: "" });
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
      setError("Không thể thêm user: " + (err.response?.data?.message || err.message));
    }
  };

  // Xóa user
  const handleDelete = async (id) => {
    setError("");
    try {
      await adminService.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
      setError("Không thể xóa user: " + (err.response?.data?.message || err.message));
    }
  };

  // Bắt đầu sửa user
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({ 
      username: user.username, 
      email: user.email, 
      fullName: user.fullName 
    });
  };

  // Lưu user đã sửa
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await adminService.updateUser(editingUser._id, editForm);
      setUsers(users.map((u) => (u._id === editingUser._id ? response.data.user : u)));
      setEditingUser(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
      setError("Không thể cập nhật user: " + (err.response?.data?.message || err.message));
    }
  };

  if (showTest) {
    return (
      <div>
        <TestConnection />
        <div style={{ padding: '20px' }}>
          <button onClick={() => setShowTest(false)}>
            ➡️ Chuyển sang User Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowTest(true)}>
          🔧 Connection Test
        </button>
      </div>
      <h1>Group 4 - User Management</h1>
      <p>Kết nối tới: <code>{API_CONFIG.BASE_URL}</code></p>
      
      {error && (
        <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      
      {loading && <p>Đang tải dữ liệu...</p>}
      
      <h2>Danh sách Users</h2>
      {users.length === 0 ? (
        <p>Chưa có user nào</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id} style={{ marginBottom: "10px" }}>
              <strong>{u.fullName}</strong> (@{u.username}) - {u.email}
              {u.role && <span> - Role: {u.role.name}</span>}
              <button
                onClick={() => handleEdit(u)}
                style={{ marginLeft: 8 }}
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(u._id)}
                style={{ marginLeft: 4 }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Thêm User Mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            required
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button type="submit">Thêm User</button>
        </div>
      </form>

      {editingUser && (
        <div style={{ backgroundColor: "#f5f5f5", padding: "15px", marginTop: "20px" }}>
          <h2>Sửa User: {editingUser.fullName}</h2>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Username"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                required
                style={{ marginRight: "10px", padding: "5px" }}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                required
                style={{ marginRight: "10px", padding: "5px" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
                style={{ marginRight: "10px", padding: "5px" }}
              />
            </div>
            <button type="submit">Lưu Thay Đổi</button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              style={{ marginLeft: 4 }}
            >
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

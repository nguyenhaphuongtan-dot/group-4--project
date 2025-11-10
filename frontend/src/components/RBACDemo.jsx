import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import './RBACDemo.css';

const RBACDemo = () => {
  const user = useSelector(selectUser);
  const role = user?.role || 'guest';

  const permissions = {
    admin: ['VIEW_DASHBOARD', 'MANAGE_USERS', 'VIEW_ANALYTICS'],
    user: ['VIEW_PROFILE', 'EDIT_PROFILE'],
    guest: []
  };

  const userPermissions = permissions[role] || [];

  return (
    <div className="rbac-demo" style={{ padding: 20 }}>
      <h2>🔐 RBAC Demo</h2>
      <p>Role: <strong>{role}</strong></p>

      <div style={{ marginTop: 12 }}>
        <h4>Your permissions</h4>
        {userPermissions.length === 0 ? (
          <p>No permissions assigned.</p>
        ) : (
          <ul>
            {userPermissions.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RBACDemo;
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import './RBACDemo.css';

const RBACDemo = () => {
  const user = useSelector(selectUser);

  const role = user?.role || 'guest';

  const permissions = {
    admin: ['VIEW_DASHBOARD', 'MANAGE_USERS', 'VIEW_ANALYTICS'],
    user: ['VIEW_PROFILE', 'EDIT_PROFILE'],
    guest: []
  };

  const userPermissions = permissions[role] || [];

  return (
    <div className="rbac-demo" style={{ padding: 20 }}>
      <h2>🔐 RBAC Demo</h2>
      <p>Role: <strong>{role}</strong></p>

      <div style={{ marginTop: 12 }}>
        <h4>Your permissions</h4>
        {userPermissions.length === 0 ? (
          <p>No permissions assigned.</p>
        ) : (
          <ul>
            {userPermissions.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RBACDemo;
import React from 'react';import React from 'react';import React from 'react';import React from 'react';/**/**



const RBACDemo = () => {

  return (

    <div style={{ padding: '20px' }}>const RBACDemo = () => {import { useSelector } from 'react-redux';

      <h2>🔐 RBAC Demo</h2>

      <p>Role-Based Access Control System</p>  return (

      <div style={{ 

        background: '#f8f9ff',     <div style={{ padding: '20px' }}>import { selectUser } from '../store/slices/authSlice';import { useSelector } from 'react-redux';

        border: '1px solid #e0e7ff', 

        borderRadius: '8px',       <h2>🔐 RBAC Demo</h2>

        padding: '20px' 

      }}>      <p>Role-Based Access Control demonstration</p>

        <h3>Phân quyền theo vai trò</h3>

        <ul>      <div style={{ 

          <li><strong>Admin:</strong> Có tất cả quyền hạn</li>

          <li><strong>User:</strong> Chỉ có quyền cơ bản</li>        background: '#f8f9ff', const RBACDemo = () => {import { selectUser } from '../store/slices/authSlice'; * RBAC Demo Component   * RBAC Demo Component  

        </ul>

      </div>        border: '1px solid #e0e7ff', 

    </div>

  );        borderRadius: '8px',   const user = useSelector(selectUser);

};

        padding: '20px' 

export default RBACDemo;
      }}>

        <h3>Hệ thống phân quyền RBAC</h3>

        <ul>  return (

          <li>Admin: Có tất cả quyền</li>

          <li>User: Chỉ có quyền cơ bản</li>    <div style={{ padding: '20px' }}>const RBACDemo = () => { * Hoạt động 6: Redux & Protected Routes * Hoạt động 6: Redux & Protected Routes

        </ul>

      </div>      <h2>🔐 RBAC Demo - Role-Based Access Control</h2>

    </div>

  );        const user = useSelector(selectUser);

};

      <div style={{ background: '#f8f9ff', border: '1px solid #e0e7ff', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>

export default RBACDemo;
        <h3>👤 Thông tin người dùng hiện tại</h3> */ */

        <p><strong>Tên:</strong> {user?.name || 'Unknown'}</p>

        <p><strong>Email:</strong> {user?.email || 'No email'}</p>  const rolePermissions = {

        <p><strong>Vai trò:</strong> {user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}</p>

      </div>    admin: ['VIEW_DASHBOARD', 'MANAGE_USERS', 'CREATE_USER', 'DELETE_USER', 'VIEW_ANALYTICS'],



      <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px' }}>    user: ['VIEW_PROFILE', 'EDIT_PROFILE', 'CHANGE_PASSWORD']

        <h3>🎯 Demo RBAC System</h3>

        <p>Hệ thống phân quyền dựa trên vai trò:</p>  };import React from 'react';import React from 'react';

        <ul>

          <li><strong>Admin:</strong> Có tất cả quyền - Dashboard, User Management, Analytics</li>

          <li><strong>User:</strong> Chỉ có quyền cơ bản - Profile, Change Password</li>

          <li>UI components hiển thị/ẩn dựa trên role</li>  const userPermissions = rolePermissions[user?.role] || [];import { useSelector } from 'react-redux';import { useSelector } from 'react-redux';

          <li>ProtectedRoute component kiểm tra quyền truy cập</li>

        </ul>

      </div>

    </div>  return (import { selectUser } from '../store/slices/authSlice';import { selectUser } from '../store/slices/authSlice';

  );

};    <div style={{ padding: '20px' }}>



export default RBACDemo;      <h2>🔐 RBAC Demo - Role-Based Access Control</h2>import './RBACDemo.css';import './RBACDemo.css';

      

      <div style={{ background: '#f8f9ff', border: '1px solid #e0e7ff', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>

        <h3>👤 Thông tin người dùng hiện tại</h3>

        <p><strong>Tên:</strong> {user?.name || 'Unknown'}</p>const RBACDemo = () => {const RBACDemo = () => {

        <p><strong>Email:</strong> {user?.email || 'No email'}</p>

        <p><strong>Vai trò:</strong> <span style={{   const user = useSelector(selectUser);  const user = useSelector(selectUser);

          background: user?.role === 'admin' ? '#ff6b6b' : '#3b82f6', 

          color: 'white', 

          padding: '4px 8px', 

          borderRadius: '4px'   const rolePermissions = {  const rolePermissions = {

        }}>

          {user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}    admin: [    admin: [

        </span></p>

      </div>      'VIEW_DASHBOARD',      'VIEW_DASHBOARD',



      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>      'MANAGE_USERS',       'MANAGE_USERS', 

        <div style={{ border: '1px solid #28a745', borderRadius: '8px', padding: '15px' }}>

          <h4 style={{ color: '#28a745' }}>🛡️ Admin Permissions</h4>      'CREATE_USER',      'CREATE_USER',

          {rolePermissions.admin.map(permission => (

            <div key={permission} style={{       'DELETE_USER',      'DELETE_USER',

              padding: '5px', 

              margin: '5px 0',       'VIEW_ANALYTICS',      'VIEW_ANALYTICS',

              background: '#d4edda', 

              borderRadius: '4px',      'MANAGE_SETTINGS',      'MANAGE_SETTINGS',

              fontSize: '14px'

            }}>      'VIEW_LOGS',      'VIEW_LOGS',

              ✅ {permission}

            </div>      'MANAGE_ROLES'      'MANAGE_ROLES'

          ))}

        </div>    ],    ],



        <div style={{ border: '1px solid #007bff', borderRadius: '8px', padding: '15px' }}>    user: [    user: [

          <h4 style={{ color: '#007bff' }}>👤 User Permissions</h4>

          {rolePermissions.user.map(permission => (      'VIEW_PROFILE',      'VIEW_PROFILE',

            <div key={permission} style={{ 

              padding: '5px',       'EDIT_PROFILE',      'EDIT_PROFILE',

              margin: '5px 0', 

              background: '#cce7ff',       'CHANGE_PASSWORD'      'CHANGE_PASSWORD'

              borderRadius: '4px',

              fontSize: '14px'    ]    ]

            }}>

              ✅ {permission}  };  };

            </div>

          ))}

          {rolePermissions.admin.filter(p => !rolePermissions.user.includes(p)).map(permission => (

            <div key={permission} style={{   const userPermissions = rolePermissions[user?.role] || [];  const userPermissions = rolePermissions[user?.role] || [];

              padding: '5px', 

              margin: '5px 0', 

              background: '#ffebee', 

              borderRadius: '4px',  const allPermissions = [  const allPermissions = [

              fontSize: '14px',

              color: '#666'    { key: 'VIEW_DASHBOARD', name: 'Xem Dashboard', icon: '📊', description: 'Truy cập trang dashboard với thống kê tổng quan' },    { key: 'VIEW_DASHBOARD', name: 'Xem Dashboard', icon: '📊', description: 'Truy cập trang dashboard với thống kê tổng quan' },

            }}>

              ❌ {permission}    { key: 'MANAGE_USERS', name: 'Quản lý Users', icon: '👥', description: 'Xem danh sách và quản lý người dùng' },    { key: 'MANAGE_USERS', name: 'Quản lý Users', icon: '👥', description: 'Xem danh sách và quản lý người dùng' },

            </div>

          ))}    { key: 'CREATE_USER', name: 'Tạo User', icon: '➕', description: 'Thêm người dùng mới vào hệ thống' },    { key: 'CREATE_USER', name: 'Tạo User', icon: '➕', description: 'Thêm người dùng mới vào hệ thống' },

        </div>

      </div>    { key: 'DELETE_USER', name: 'Xóa User', icon: '🗑️', description: 'Xóa người dùng khỏi hệ thống' },    { key: 'DELETE_USER', name: 'Xóa User', icon: '�️', description: 'Xóa người dùng khỏi hệ thống' },



      <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px' }}>    { key: 'VIEW_ANALYTICS', name: 'Xem Analytics', icon: '📈', description: 'Truy cập báo cáo và phân tích dữ liệu' },    { key: 'VIEW_ANALYTICS', name: 'Xem Analytics', icon: '📈', description: 'Truy cập báo cáo và phân tích dữ liệu' },

        <h3>🎯 Quyền hạn của bạn</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>    { key: 'MANAGE_SETTINGS', name: 'Quản lý Cài đặt', icon: '⚙️', description: 'Thay đổi cấu hình hệ thống' },    { key: 'MANAGE_SETTINGS', name: 'Quản lý Cài đặt', icon: '⚙️', description: 'Thay đổi cấu hình hệ thống' },

          {['VIEW_DASHBOARD', 'MANAGE_USERS', 'CREATE_USER', 'DELETE_USER', 'VIEW_ANALYTICS', 'VIEW_PROFILE', 'EDIT_PROFILE', 'CHANGE_PASSWORD'].map(permission => {

            const hasPermission = userPermissions.includes(permission);    { key: 'VIEW_LOGS', name: 'Xem Logs', icon: '📋', description: 'Truy cập nhật ký hoạt động hệ thống' },    { key: 'VIEW_LOGS', name: 'Xem Logs', icon: '📋', description: 'Truy cập nhật ký hoạt động hệ thống' },

            return (

              <div key={permission} style={{     { key: 'MANAGE_ROLES', name: 'Quản lý Roles', icon: '🔐', description: 'Thay đổi vai trò và quyền hạn' },    { key: 'MANAGE_ROLES', name: 'Quản lý Roles', icon: '🔐', description: 'Thay đổi vai trò và quyền hạn' },

                padding: '10px', 

                border: '1px solid #ddd',     { key: 'VIEW_PROFILE', name: 'Xem Profile', icon: '👤', description: 'Xem thông tin cá nhân' },    { key: 'VIEW_PROFILE', name: 'Xem Profile', icon: '👤', description: 'Xem thông tin cá nhân' },

                borderRadius: '4px',

                background: hasPermission ? '#d4edda' : '#f8d7da',    { key: 'EDIT_PROFILE', name: 'Sửa Profile', icon: '✏️', description: 'Chỉnh sửa thông tin cá nhân' },    { key: 'EDIT_PROFILE', name: 'Sửa Profile', icon: '✏️', description: 'Chỉnh sửa thông tin cá nhân' },

                textAlign: 'center'

              }}>    { key: 'CHANGE_PASSWORD', name: 'Đổi mật khẩu', icon: '🔒', description: 'Thay đổi mật khẩu đăng nhập' }    { key: 'CHANGE_PASSWORD', name: 'Đổi mật khẩu', icon: '🔒', description: 'Thay đổi mật khẩu đăng nhập' }

                <div style={{ fontSize: '18px', marginBottom: '5px' }}>

                  {hasPermission ? '✅' : '❌'}  ];  ];

                </div>

                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>

                  {permission}

                </div>  return (  return (

              </div>

            );    <div className="rbac-demo">    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

          })}

        </div>      <div className="rbac-header">      <h1>🔐 RBAC Demo - Role-Based Access Control</h1>

      </div>

        <h2>🔐 Role-Based Access Control (RBAC) Demo</h2>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '8px' }}>

        <h4>🔐 Cách hoạt động:</h4>        <p>Hệ thống phân quyền dựa trên vai trò người dùng</p>      {!isLoggedIn ? (

        <ul style={{ fontSize: '14px' }}>

          <li><strong>Admin:</strong> Có tất cả quyền - Dashboard, User Management, Analytics</li>      </div>        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>

          <li><strong>User:</strong> Chỉ có quyền cơ bản - Profile, Change Password</li>

          <li>UI components hiển thị/ẩn dựa trên role</li>          <h3>Select Test Account</h3>

          <li>ProtectedRoute component kiểm tra quyền truy cập</li>

          <li>Backend API cũng có middleware kiểm tra role</li>      <div className="current-user">          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '20px' }}>

        </ul>

      </div>        <h3>👤 Thông tin người dùng hiện tại</h3>            {testAccounts.map(account => (

    </div>

  );        <div className="user-info">              <div 

};

          <div className="user-avatar">                key={account.username}

export default RBACDemo;
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}                onClick={() => handleAccountSelect(account)}

          </div>                style={{

          <div className="user-details">                  border: selectedAccount === account.username ? '2px solid #007bff' : '1px solid #ddd',

            <div className="user-name">{user?.name || 'Unknown User'}</div>                  padding: '15px',

            <div className="user-email">{user?.email || 'No email'}</div>                  borderRadius: '8px',

            <div className={`user-role ${user?.role}`}>                  cursor: 'pointer',

              {user?.role === 'admin' ? '🛡️ Administrator' : '👤 User'}                  backgroundColor: selectedAccount === account.username ? '#f8f9fa' : 'white'

            </div>                }}

          </div>              >

        </div>                <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{account.role}</h4>

      </div>                <p style={{ margin: '5px 0', fontSize: '14px' }}>

                  <strong>Username:</strong> {account.username}<br/>

      <div className="permissions-demo">                  <strong>Password:</strong> {account.password}

        <h3>🔑 Ma trận phân quyền</h3>                </p>

                        <p style={{ margin: '10px 0 0 0', fontSize: '13px', color: '#666' }}>

        <div className="role-comparison">                  {account.description}

          <div className="role-column">                </p>

            <h4 className="role-header admin">🛡️ Admin Role</h4>              </div>

            <div className="permissions-list">            ))}

              {rolePermissions.admin.map(permission => (          </div>

                <div key={permission} className="permission-item granted">

                  <span className="permission-icon">          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>

                    {allPermissions.find(p => p.key === permission)?.icon || '✅'}            <h4>Login Form</h4>

                  </span>            <div style={{ marginBottom: '10px' }}>

                  <span className="permission-name">              <input

                    {allPermissions.find(p => p.key === permission)?.name || permission}                type="text"

                  </span>                placeholder="Username"

                </div>                value={loginForm.username}

              ))}                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}

            </div>                style={{ width: '200px', padding: '8px', marginRight: '10px' }}

          </div>              />

              <input

          <div className="role-column">                type="password"

            <h4 className="role-header user">👤 User Role</h4>                placeholder="Password"

            <div className="permissions-list">                value={loginForm.password}

              {rolePermissions.user.map(permission => (                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}

                <div key={permission} className="permission-item granted">                style={{ width: '200px', padding: '8px', marginRight: '10px' }}

                  <span className="permission-icon">              />

                    {allPermissions.find(p => p.key === permission)?.icon || '✅'}              <button 

                  </span>                onClick={handleLogin} 

                  <span className="permission-name">                disabled={isLoading}

                    {allPermissions.find(p => p.key === permission)?.name || permission}                style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}

                  </span>              >

                </div>                {isLoading ? 'Logging in...' : 'Login'}

              ))}              </button>

              {/* Show denied permissions for user */}            </div>

              {rolePermissions.admin          </div>

                .filter(p => !rolePermissions.user.includes(p))        </div>

                .map(permission => (      ) : (

                  <div key={permission} className="permission-item denied">        <div>

                    <span className="permission-icon">❌</span>          {/* User Header */}

                    <span className="permission-name">          <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>

                      {allPermissions.find(p => p.key === permission)?.name || permission}            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    </span>              <div style={{ display: 'flex', alignItems: 'center' }}>

                  </div>                <img src={user.avatar} alt={user.username} style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px' }} />

                ))}                <div>

            </div>                  <h3 style={{ margin: '0 0 5px 0' }}>Welcome, {user.fullName || user.username}!</h3>

          </div>                  <p style={{ margin: '0', color: '#666' }}>

        </div>                    <strong>Role:</strong> {user.role} | <strong>Department:</strong> {user.department} | <strong>Email:</strong> {user.email}

      </div>                  </p>

                  <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>

      <div className="current-permissions">                    <strong>Permissions:</strong> {user.permissions.join(', ')}

        <h3>🎯 Quyền hạn của bạn</h3>                  </p>

        <div className="permissions-grid">                </div>

          {allPermissions.map(permission => {              </div>

            const hasPermission = userPermissions.includes(permission.key);              <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>

            return (                Logout

              <div               </button>

                key={permission.key}             </div>

                className={`permission-card ${hasPermission ? 'granted' : 'denied'}`}          </div>

              >

                <div className="permission-card-header">          {/* Role-based Content */}

                  <span className="permission-card-icon">{permission.icon}</span>          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>

                  <span className="permission-status">            

                    {hasPermission ? '✅' : '❌'}            {/* Dashboard - Admin & Moderator */}

                  </span>            {hasPermission('VIEW_DASHBOARD') && dashboardData && (

                </div>              <div style={{ border: '1px solid #28a745', padding: '20px', borderRadius: '8px' }}>

                <h4 className="permission-card-name">{permission.name}</h4>                <h4 style={{ color: '#28a745', margin: '0 0 15px 0' }}>📊 Dashboard</h4>

                <p className="permission-card-description">{permission.description}</p>                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>

                <div className={`permission-badge ${hasPermission ? 'granted' : 'denied'}`}>                  <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '4px', textAlign: 'center' }}>

                  {hasPermission ? 'Được phép' : 'Bị từ chối'}                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{dashboardData.totalUsers}</div>

                </div>                    <div style={{ fontSize: '12px' }}>Total Users</div>

              </div>                  </div>

            );                  <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px', textAlign: 'center' }}>

          })}                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{dashboardData.totalAdmins}</div>

        </div>                    <div style={{ fontSize: '12px' }}>Admins</div>

      </div>                  </div>

                </div>

      <div className="rbac-explanation">                <h5>Recent Activity:</h5>

        <h3>📚 Giải thích RBAC</h3>                {dashboardData.recentActivity.map((activity, index) => (

        <div className="explanation-grid">                  <div key={index} style={{ fontSize: '12px', margin: '5px 0', padding: '5px', backgroundColor: '#f8f9fa', borderRadius: '3px' }}>

          <div className="explanation-card">                    <strong>{activity.action}</strong> by {activity.user} - {activity.time}

            <h4>🛡️ Admin Role</h4>                  </div>

            <ul>                ))}

              <li>Có tất cả quyền hạn trong hệ thống</li>              </div>

              <li>Có thể quản lý người dùng (CRUD)</li>            )}

              <li>Truy cập dashboard và analytics</li>

              <li>Quản lý cài đặt hệ thống</li>            {/* User Management - Admin & Moderator */}

              <li>Xem logs và quản lý roles</li>            {hasPermission('VIEW_USERS') && (

            </ul>              <div style={{ border: '1px solid #17a2b8', padding: '20px', borderRadius: '8px' }}>

          </div>                <h4 style={{ color: '#17a2b8', margin: '0 0 15px 0' }}>👥 User Management</h4>

                          

          <div className="explanation-card">                {/* Create User Form - Admin Only */}

            <h4>👤 User Role</h4>                {hasPermission('CREATE_USER') && (

            <ul>                  <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e1f5fe', borderRadius: '4px' }}>

              <li>Chỉ có quyền cơ bản</li>                    <h5 style={{ margin: '0 0 10px 0' }}>Create New User (Admin Only)</h5>

              <li>Xem và chỉnh sửa profile cá nhân</li>                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>

              <li>Đổi mật khẩu</li>                      <input

              <li>Không thể truy cập admin features</li>                        type="text"

              <li>UI sẽ ẩn các tính năng không có quyền</li>                        placeholder="Username"

            </ul>                        value={newUser.username}

          </div>                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}

        </div>                        style={{ padding: '5px' }}

                      />

        <div className="implementation-notes">                      <input

          <h4>🔧 Cách triển khai:</h4>                        type="email"

          <ol>                        placeholder="Email"

            <li><strong>Frontend:</strong> Component ProtectedRoute kiểm tra role</li>                        value={newUser.email}

            <li><strong>UI Conditional:</strong> Hiển thị/ẩn elements dựa trên quyền</li>                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}

            <li><strong>Backend:</strong> Middleware xác thực token và role</li>                        style={{ padding: '5px' }}

            <li><strong>Database:</strong> Lưu role trong user model</li>                      />

            <li><strong>Redux:</strong> Quản lý authentication state</li>                      <input

          </ol>                        type="password"

        </div>                        placeholder="Password"

      </div>                        value={newUser.password}

                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}

      <div className="test-section">                        style={{ padding: '5px' }}

        <h3>🧪 Test RBAC</h3>                      />

        <div className="test-cards">                      <input

          <div className="test-card">                        type="text"

            <h4>Thử nghiệm với Admin</h4>                        placeholder="Full Name"

            <p>Login với: <code>admin@test.com / 123456</code></p>                        value={newUser.fullName}

            <p>Sẽ thấy tất cả tính năng</p>                        onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}

          </div>                        style={{ padding: '5px' }}

          <div className="test-card">                      />

            <h4>Thử nghiệm với User</h4>                      <input

            <p>Login với: <code>user@test.com / 123456</code></p>                        type="text"

            <p>Chỉ thấy tính năng cơ bản</p>                        placeholder="Department"

          </div>                        value={newUser.department}

        </div>                        onChange={(e) => setNewUser({...newUser, department: e.target.value})}

      </div>                        style={{ padding: '5px' }}

    </div>                      />

  );                      <select

};                        value={newUser.role}

                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}

export default RBACDemo;                        style={{ padding: '5px' }}
                      >
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCreateUser}
                      disabled={isLoading}
                      style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      {isLoading ? 'Creating...' : 'Create User'}
                    </button>
                  </div>
                )}

                {/* Users List */}
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {users.map(u => (
                    <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={u.avatar} alt={u.username} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{u.fullName}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{u.username} - {u.role} - {u.department}</div>
                        </div>
                      </div>
                      {hasPermission('DELETE_USER') && u.id !== user.id && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics - Admin & Moderator */}
            {hasPermission('VIEW_ANALYTICS') && analytics && (
              <div style={{ border: '1px solid #ffc107', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ color: '#856404', margin: '0 0 15px 0' }}>📈 Analytics</h4>
                
                <h5>Role Distribution:</h5>
                <div style={{ marginBottom: '15px' }}>
                  {Object.entries(analytics.roleDistribution).map(([role, count]) => (
                    <div key={role} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                      <span>{role}:</span>
                      <span style={{ fontWeight: 'bold' }}>{count}</span>
                    </div>
                  ))}
                </div>

                <h5>Department Stats:</h5>
                <div>
                  {Object.entries(analytics.departmentStats).map(([dept, count]) => (
                    <div key={dept} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                      <span>{dept}:</span>
                      <span style={{ fontWeight: 'bold' }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings - Admin Only */}
            {hasPermission('MANAGE_SETTINGS') && settings && (
              <div style={{ border: '1px solid #6f42c1', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ color: '#6f42c1', margin: '0 0 15px 0' }}>⚙️ Settings (Admin Only)</h4>
                <div>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Site Name:</strong> {settings.siteName}
                  </div>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Allow Registration:</strong> {settings.allowRegistration ? 'Yes' : 'No'}
                  </div>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Default Role:</strong> {settings.defaultRole}
                  </div>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Session Timeout:</strong> {settings.sessionTimeout} minutes
                  </div>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Max Login Attempts:</strong> {settings.maxLoginAttempts}
                  </div>
                </div>
              </div>
            )}

            {/* Profile - All Users */}
            <div style={{ border: '1px solid #6c757d', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#6c757d', margin: '0 0 15px 0' }}>👤 My Profile</h4>
              <div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Full Name:</strong> {user.fullName}
                </div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Username:</strong> {user.username}
                </div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Email:</strong> {user.email}
                </div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Role:</strong> {user.role}
                </div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Department:</strong> {user.department}
                </div>
                <div style={{ margin: '10px 0' }}>
                  <strong>Permissions:</strong>
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>
                    {user.permissions.map(permission => (
                      <span key={permission} style={{ display: 'inline-block', margin: '2px', padding: '2px 6px', backgroundColor: '#e9ecef', borderRadius: '3px' }}>
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Logs */}
      <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3>Activity Logs</h3>
          <button onClick={clearLogs} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
            Clear Logs
          </button>
        </div>
        
        <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #dee2e6', padding: '10px', backgroundColor: '#f8f9fa', fontFamily: 'monospace', fontSize: '12px' }}>
          {logs.length === 0 ? (
            <p style={{ color: '#6c757d' }}>No logs yet...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '5px', color: log.type === 'error' ? '#dc3545' : log.type === 'success' ? '#28a745' : log.type === 'warning' ? '#ffc107' : '#495057' }}>
                <span style={{ color: '#6c757d' }}>[{log.timestamp}]</span> {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RBAC Explanation */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '8px' }}>
        <h4>🔐 How RBAC Works:</h4>
        <ul style={{ fontSize: '14px' }}>
          <li><strong>Admin:</strong> Full access - Dashboard, User Management (CRUD), Analytics, Settings</li>
          <li><strong>Moderator:</strong> Limited management - Dashboard, View/Edit Users, Analytics</li>
          <li><strong>User:</strong> Basic access - Profile only</li>
          <li>UI components are dynamically shown/hidden based on user permissions</li>
          <li>API endpoints are protected with role-based middleware</li>
        </ul>
      </div>
    </div>
  );
};

export default RBACDemo;
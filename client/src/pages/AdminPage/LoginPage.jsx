import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 设置管理员账号密码
  const adminCredentials = {
    username: 'goldsame',
    password: 'S13790882369'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // 登录成功，设置本地存储标记已登录状态
      localStorage.setItem('isAdminLoggedIn', 'true');
      // 跳转到添加游戏页面
      navigate('/admin/add-game');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>管理员登录</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">登录</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
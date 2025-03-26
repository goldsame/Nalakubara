import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  
  // 这里应该有管理员身份验证逻辑
  // const isAdmin = checkAdminStatus();
  const isAdmin = true; // 临时设置为true，实际应该从认证系统获取
  
  // 如果不是管理员，重定向到首页
  // if (!isAdmin) {
  //   navigate('/');
  //   return null;
  // }
  
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-logo">
          <Link to="/admin">游戏管理系统</Link>
        </div>
        <nav className="admin-nav">
          <Link to="/">返回前台</Link>
        </nav>
      </header>
      
      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-menu">
            <ul>
              <li>
                <Link to="/admin">控制面板</Link>
              </li>
              <li>
                <Link to="/admin/add-game">添加游戏</Link>
              </li>
              <li>
                <Link to="/admin/games">游戏管理</Link>
              </li>
              <li>
                <Link to="/admin/users">用户管理</Link>
              </li>
              <li>
                <Link to="/admin/settings">系统设置</Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
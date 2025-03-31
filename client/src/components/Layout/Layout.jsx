import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const isHomePage = location.pathname === '/';
  
  // 确保初始状态在移动设备上是隐藏的
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 切换侧边栏显示状态的函数
  const toggleSidebar = () => {
    console.log("Layout中的toggleSidebar被调用");
    setSidebarVisible(prevState => !prevState);
    // 使用alert显示状态变化，这样在手机上也能看到
    alert(`侧边栏状态切换: ${sidebarVisible ? '显示->隐藏' : '隐藏->显示'}`);
  };

  // 添加一个简单的调试信息，直接显示在页面上
  const debugStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '10px',
    zIndex: 9999,
    fontSize: '12px'
  };

  return (
    <div className="layout">
      {/* 确保正确传递toggleSidebar函数 */}
      <Header toggleSidebar={toggleSidebar} />
      
      {/* 添加直接显示在页面上的调试信息 */}
      <div style={debugStyle}>
        侧边栏状态: {sidebarVisible ? '显示' : '隐藏'}<br/>
        类名: sidebar-container {sidebarVisible ? 'mobile-sidebar-visible' : ''}
      </div>
      
      <div className="content-container">
        <div className={`sidebar-container ${sidebarVisible ? 'mobile-sidebar-visible' : ''}`}>
          <Sidebar />
        </div>
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
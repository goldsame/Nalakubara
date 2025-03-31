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
  const [debugInfo, setDebugInfo] = useState('初始状态');
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const newState = window.innerWidth > 768;
      setSidebarVisible(newState);
      setDebugInfo(`窗口大小改变: ${window.innerWidth}px, 侧边栏: ${newState ? '显示' : '隐藏'}`);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 切换侧边栏显示状态的函数
  const toggleSidebar = () => {
    setSidebarVisible(prevState => {
      const newState = !prevState;
      setDebugInfo(`菜单点击: 侧边栏从${prevState ? '显示' : '隐藏'}变为${newState ? '显示' : '隐藏'}`);
      return newState;
    });
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      
      {/* 添加调试信息显示 */}
      <div style={{
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.7)', 
        color: 'white', 
        padding: '10px', 
        zIndex: 9999,
        fontSize: '12px'
      }}>
        调试: {debugInfo}<br/>
        侧边栏状态: {sidebarVisible ? '显示' : '隐藏'}<br/>
        类名: sidebar-container {sidebarVisible ? 'mobile-sidebar-visible' : ''}
      </div>
      
      <div className="content-container">
        {/* 确保正确应用visible/hidden类名 */}
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
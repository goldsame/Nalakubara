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
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {/* 确保正确应用visible/hidden类名 */}
        <div className={`sidebar-container ${sidebarVisible ? 'visible' : ''}`}>
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
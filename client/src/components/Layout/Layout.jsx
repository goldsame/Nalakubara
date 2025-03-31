import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // 添加一个状态来控制侧边栏的显示
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);
  
  // 监听窗口大小变化，在移动设备上自动隐藏侧边栏
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 切换侧边栏显示状态的函数
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {/* 添加条件类名，控制侧边栏显示 */}
        <div className={`sidebar-container ${sidebarVisible ? 'visible' : 'hidden'}`}>
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
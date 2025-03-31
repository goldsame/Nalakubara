import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // 使用一个简单的状态变量
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  // 在组件挂载时根据屏幕宽度设置初始状态
  useEffect(() => {
    setSidebarVisible(window.innerWidth > 768);
  }, []);
  
  // 简化的切换函数
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    // 添加一个简单的调试提示
    console.log("侧边栏状态:", !sidebarVisible ? "显示" : "隐藏");
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="content-container">
        {/* 使用mobile-sidebar-visible类控制显示 */}
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
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
    console.log("切换侧边栏");
    setSidebarVisible(prevState => !prevState);
    // 添加一个简单的调试提示
    alert("侧边栏状态已切换"); // 添加alert以便在移动端确认函数被调用
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
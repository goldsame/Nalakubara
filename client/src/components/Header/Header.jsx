import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 搜索处理函数
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 键盘按键处理函数
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 搜索处理函数
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 添加汉堡菜单点击处理函数
  const handleMenuToggle = (e) => {
    console.log("汉堡菜单被点击");
    console.log("toggleSidebar类型:", typeof toggleSidebar);
    
    // 移除preventDefault，可能会阻止事件冒泡
    // e.preventDefault();
    
    if (typeof toggleSidebar === 'function') {
      toggleSidebar();
      // 添加一个临时的视觉反馈
      const icon = e.currentTarget.querySelector('.menu-icon');
      if (icon) {
        icon.style.backgroundColor = '#7e57c2';
        setTimeout(() => {
          icon.style.backgroundColor = '#fff';
        }, 300);
      }
    } else {
      console.error("toggleSidebar 不是一个函数", toggleSidebar);
      // 使用alert而不是console.log，这样在手机上也能看到
      alert(`toggleSidebar 不是一个函数: ${typeof toggleSidebar}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* 确保汉堡菜单按钮正确绑定点击事件 */}
        <button 
          className="menu-toggle" 
          onClick={handleMenuToggle} 
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
        </button>
        
        <div className="logo">
          <Link to="/">
            <span>Nalakubara</span>
          </Link>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <div className="nav-buttons">
          <Link to="/admin" className="admin-button">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
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

  return (
    <header className="header">
      <div className="header-content">
        {/* 移动端显示 */}
        <div className="mobile-header">
          {/* 第一行：LOGO和登录按钮 */}
          <div className="top-row">
            <div className="logo">
              <Link to="/">
                <span>Nalakubara</span>
              </Link>
            </div>
            
            <div className="nav-buttons">
              <Link to="/admin" className="login-button">
                Log in
              </Link>
            </div>
          </div>
          
          {/* 第二行：汉堡菜单和搜索栏 */}
          <div className="bottom-row">
            <button 
              className="menu-toggle" 
              onClick={toggleSidebar} 
              aria-label="Toggle menu"
            >
              <span className="menu-icon"></span>
            </button>
            
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
          </div>
        </div>
        
        {/* PC端显示 */}
        <div className="desktop-header">
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
            <Link to="/admin" className="login-button">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
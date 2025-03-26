import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-theme');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="CrazyGames" className="logo-image" />
            <span className="logo-text">CrazyGames</span>
          </Link>
        </div>
        
        <div className="search-container">
          <input type="text" className="search-input" placeholder="搜索游戏..." />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <nav className="nav-menu">
          <NavLink to="/" className="nav-link" exact>首页</NavLink>
          <NavLink to="/categories" className="nav-link">分类</NavLink>
          <NavLink to="/new" className="nav-link">新游戏</NavLink>
          <NavLink to="/popular" className="nav-link">热门</NavLink>
          <NavLink to="/multiplayer" className="nav-link">多人</NavLink>
        </nav>
        
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          <Link to="/login" className="btn btn-sm btn-outline">登录</Link>
          <Link to="/register" className="btn btn-sm btn-primary">注册</Link>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
      
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" className="mobile-nav-link" exact>首页</NavLink>
        <NavLink to="/categories" className="mobile-nav-link">分类</NavLink>
        <NavLink to="/new" className="mobile-nav-link">新游戏</NavLink>
        <NavLink to="/popular" className="mobile-nav-link">热门</NavLink>
        <NavLink to="/multiplayer" className="mobile-nav-link">多人</NavLink>
        <div className="mobile-actions">
          <Link to="/login" className="btn btn-sm btn-outline">登录</Link>
          <Link to="/register" className="btn btn-sm btn-primary">注册</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
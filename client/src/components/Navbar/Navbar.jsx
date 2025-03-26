import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="CrazyGames" className="logo-image" />
          <span className="logo-text">CrazyGames</span>
        </Link>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="搜索游戏..." 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </form>
        
        <div className="navbar-links">
          <NavLink to="/" className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}>首页</NavLink>
          <NavLink to="/hot" className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}>热门</NavLink>
          <NavLink to="/new" className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}>新游戏</NavLink>
          <NavLink to="/featured" className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}>精选</NavLink>
          <NavLink to="/categories" className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}>多人游戏</NavLink>
        </div>
        
        <div className="navbar-auth">
          <Link to="/login" className="login-button">登录</Link>
          <Link to="/register" className="register-button">注册</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
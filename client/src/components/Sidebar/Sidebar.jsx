import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import gamesData from '../../data/games.json';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  
  // 定义所有可能的分类
  const allCategories = [
    { id: 'action', name: 'Action', icon: 'fas fa-bolt', className: 'action-icon' },
    { id: 'adventure', name: 'Adventure', icon: 'fas fa-compass', className: 'adventure-icon' },
    { id: 'puzzle', name: 'Puzzle', icon: 'fas fa-puzzle-piece', className: 'puzzle-icon' },
    { id: 'shooting', name: 'Shooting', icon: 'fas fa-crosshairs', className: 'shooting-icon' },
    { id: 'racing', name: 'Racing', icon: 'fas fa-car', className: 'racing-icon' },
    { id: 'strategy', name: 'Strategy', icon: 'fas fa-chess', className: 'strategy-icon' },
    { id: 'multiplayer', name: 'Multiplayer', icon: 'fas fa-users', className: 'multiplayer-icon' },
    { id: 'io', name: 'IO', icon: 'fas fa-globe', className: 'io-icon' },
    { id: 'sports', name: 'Sports', icon: 'fas fa-futbol', className: 'sports-icon' },
    { id: '2player', name: '2 Player', icon: 'fas fa-user-friends', className: 'player2-icon' },
    { id: 'basketball', name: 'Basketball', icon: 'fas fa-basketball-ball', className: 'basketball-icon' },
    { id: 'beauty', name: 'Beauty', icon: 'fas fa-magic', className: 'beauty-icon' },
    { id: 'bike', name: 'Bike', icon: 'fas fa-bicycle', className: 'bike-icon' },
    { id: 'car', name: 'Car', icon: 'fas fa-car-side', className: 'car-icon' },
    { id: 'card', name: 'Card', icon: 'fas fa-credit-card', className: 'card-icon' }, // 修正卡牌图标
    { id: 'casual', name: 'Casual', icon: 'fas fa-gamepad', className: 'casual-icon' },
    { id: 'clicker', name: 'Clicker', icon: 'fas fa-mouse-pointer', className: 'clicker-icon' },
    { id: 'controller', name: 'Controller', icon: 'fas fa-gamepad', className: 'controller-icon' },
    { id: 'dressup', name: 'Dress Up', icon: 'fas fa-tshirt', className: 'dressup-icon' },
    { id: 'driving', name: 'Driving', icon: 'fas fa-truck', className: 'driving-icon' },
    { id: 'escape', name: 'Escape', icon: 'fas fa-door-open', className: 'escape-icon' },
    { id: 'flash', name: 'Flash', icon: 'fas fa-bolt', className: 'flash-icon' },
    { id: 'fps', name: 'FPS', icon: 'fas fa-crosshairs', className: 'fps-icon' },
    { id: 'horror', name: 'Horror', icon: 'fas fa-ghost', className: 'horror-icon' },
    { id: 'mahjong', name: 'Mahjong', icon: 'fas fa-th', className: 'mahjong-icon' },
    { id: 'minecraft', name: 'Minecraft', icon: 'fas fa-cubes', className: 'minecraft-icon' },
    { id: 'pool', name: 'Pool', icon: 'fas fa-circle', className: 'pool-icon' },
    { id: 'soccer', name: 'Soccer', icon: 'fas fa-futbol', className: 'soccer-icon' },
    { id: 'stickman', name: 'Stickman', icon: 'fas fa-running', className: 'stickman-icon' },
    { id: 'tower-defense', name: 'Tower Defense', icon: 'fas fa-chess-rook', className: 'tower-defense-icon' }
  ];

  // 获取有游戏的分类
  useEffect(() => {
    const categoriesWithGames = [];
    const categoriesSet = new Set();
    
    // 收集所有游戏中的分类
    gamesData.forEach(game => {
      if (game.category && !categoriesSet.has(game.category)) {
        categoriesSet.add(game.category);
      }
    });
    
    // 只保留有游戏的分类
    allCategories.forEach(category => {
      if (categoriesSet.has(category.id)) {
        categoriesWithGames.push(category.id);
      }
    });
    
    setCategories(categoriesWithGames);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <NavLink to="/" exact className="sidebar-item" activeClassName="active">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/hot" className="sidebar-item" activeClassName="active">
          <i className="fas fa-fire"></i>
          <span>Hot</span>
        </NavLink>
        <NavLink to="/new" className="sidebar-item" activeClassName="active">
          <i className="fas fa-plus"></i>
          <span>New Games</span>
        </NavLink>
        <NavLink to="/multiplayer" className="sidebar-item" activeClassName="active">
          <i className="fas fa-users"></i>
          <span>Multiplayer</span>
        </NavLink>
        
        <div className="sidebar-category-title">CATEGORIES</div>
        
        <div className="categories-container">
          {categories.map(category => {
            const categoryInfo = allCategories.find(c => c.id === category);
            if (!categoryInfo) return null;
            
            return (
              <NavLink 
                key={category}
                to={`/category/${category}`}
                className="sidebar-item"
                activeClassName="active"
              >
                <div className={`category-icon ${categoryInfo.className}`}>
                  <i className={categoryInfo.icon}></i>
                </div>
                <span>{categoryInfo.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
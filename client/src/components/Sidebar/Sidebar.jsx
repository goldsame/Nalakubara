import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <NavLink to="/" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`} end>
          <i className="icon-home"></i>
          <span>首页</span>
        </NavLink>
        
        <NavLink to="/hot" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-fire"></i>
          <span>热门</span>
        </NavLink>
        
        <NavLink to="/new" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-new"></i>
          <span>新游戏</span>
        </NavLink>
        
        <NavLink to="/featured" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-star"></i>
          <span>精选</span>
        </NavLink>
        
        <NavLink to="/categories" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-category"></i>
          <span>分类</span>
        </NavLink>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-title">游戏分类</h3>
        
        <NavLink to="/category/action" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-action"></i>
          <span>动作</span>
        </NavLink>
        
        <NavLink to="/category/adventure" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-adventure"></i>
          <span>冒险</span>
        </NavLink>
        
        <NavLink to="/category/arcade" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-arcade"></i>
          <span>街机</span>
        </NavLink>
        
        <NavLink to="/category/io" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-io"></i>
          <span>IO游戏</span>
        </NavLink>
        
        <NavLink to="/category/multiplayer" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-multiplayer"></i>
          <span>多人</span>
        </NavLink>
        
        <NavLink to="/category/puzzle" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-puzzle"></i>
          <span>益智</span>
        </NavLink>
        
        <NavLink to="/category/racing" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-racing"></i>
          <span>赛车</span>
        </NavLink>
        
        <NavLink to="/category/sports" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-sports"></i>
          <span>体育</span>
        </NavLink>
        
        <NavLink to="/category/shooting" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-shooting"></i>
          <span>射击</span>
        </NavLink>
        
        <NavLink to="/category/strategy" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>
          <i className="icon-strategy"></i>
          <span>策略</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
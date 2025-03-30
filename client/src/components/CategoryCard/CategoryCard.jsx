import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  // 获取对应的图标类名和背景色
  const getCategoryStyle = (categoryId) => {
    const categoryStyles = {
      'action': { icon: 'fas fa-bolt', bgColor: '#FFD700' },
      'adventure': { icon: 'fas fa-compass', bgColor: '#4CAF50' },
      'puzzle': { icon: 'fas fa-puzzle-piece', bgColor: '#2196F3' },
      'io': { icon: 'fas fa-globe', bgColor: '#9C27B0' },
      'multiplayer': { icon: 'fas fa-users', bgColor: '#FF5722' },
      'strategy': { icon: 'fas fa-chess', bgColor: '#607D8B' },
      'racing': { icon: 'fas fa-car', bgColor: '#F44336' },
      'sports': { icon: 'fas fa-futbol', bgColor: '#00BCD4' },
      'shooting': { icon: 'fas fa-crosshairs', bgColor: '#FF9800' },
      'other': { icon: 'fas fa-gamepad', bgColor: '#795548' }
    };
    return categoryStyles[categoryId] || { icon: 'fas fa-gamepad', bgColor: '#795548' };
  };

  const style = getCategoryStyle(category.id);

  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <div className="category-icon" style={{ backgroundColor: style.bgColor + '20', color: style.bgColor }}>
        <i className={style.icon}></i>
      </div>
      <div className="category-name">{category.name}</div>
    </Link>
  );
};

export default CategoryCard;
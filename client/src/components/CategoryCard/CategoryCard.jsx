import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ id, name, icon }) => {
  // 防止空属性导致错误
  const safeId = id || 'unknown';
  const safeName = name || '未知分类';
  const safeIcon = icon || '🎮';
  
  return (
    <Link to={`/category/${safeId}`} className="category-card">
      <div className="category-icon">{safeIcon}</div>
      <div className="category-name">{safeName}</div>
    </Link>
  );
};

export default CategoryCard;
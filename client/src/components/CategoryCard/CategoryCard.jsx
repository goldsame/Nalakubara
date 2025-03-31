import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, onClick }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="category-card"
      onClick={onClick}
      style={{ backgroundColor: category.color }}
    >
      <div className={`category-icon ${category.className}`}>
        <i className={category.icon || 'fas fa-gamepad'}></i>
      </div>
      <div className="category-info">
        <h3>{category.name}</h3>
        <span>{category.gamesCount} games</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, onClick }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="category-card"
      onClick={onClick}
    >
      <div className={`category-icon ${category.className || category.id + '-icon'}`}>
        <i className={category.icon || 'fas fa-gamepad'}></i>
      </div>
      <div className="category-info">
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
import React from 'react';
import './Skeleton.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton"></div>
      <div className="skeleton-title skeleton"></div>
      <div className="skeleton-text skeleton"></div>
    </div>
  );
};

export default SkeletonCard;
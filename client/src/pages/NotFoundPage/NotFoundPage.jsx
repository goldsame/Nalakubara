import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">页面未找到</h2>
        <p className="not-found-text">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link to="/" className="back-home-btn">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
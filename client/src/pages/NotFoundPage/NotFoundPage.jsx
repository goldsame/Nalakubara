import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Sorry, the page you are looking for does not exist or has been removed.
        </p>
        <Link to="/" className="back-home-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
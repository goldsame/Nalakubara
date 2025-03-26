import React from 'react';
import { useLocation } from 'react-router-dom';
import './Layout.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
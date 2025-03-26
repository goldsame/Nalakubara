import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">关于我们</h3>
          <p className="footer-text">
            Nalakubara游戏平台提供最好玩的在线游戏，无需下载，即点即玩！
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">快速链接</h3>
          <ul className="footer-links">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/hot">热门游戏</Link></li>
            <li><Link to="/new">新游戏</Link></li>
            <li><Link to="/featured">精选游戏</Link></li>
            <li><Link to="/categories">游戏分类</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">联系我们</h3>
          <ul className="footer-links">
            <li><Link to="/contact">联系方式</Link></li>
            <li><Link to="/about">关于我们</Link></li>
            <li><Link to="/privacy">隐私政策</Link></li>
            <li><Link to="/terms">服务条款</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 Nalakubara游戏平台. 保留所有权利.</p>
      </div>
    </footer>
  );
};

export default Footer;
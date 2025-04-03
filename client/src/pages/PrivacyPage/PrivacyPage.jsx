import React, { useEffect } from 'react';
import './PrivacyPage.css';
import ReactGA from 'react-ga4'; // 导入 Google Analytics

const PrivacyPage = () => {
  useEffect(() => {
    // 初始化Google Analytics
    ReactGA.initialize('G-WQQNBKTGRG');
    // 发送页面浏览事件
    ReactGA.send({ hitType: "pageview", page: "/privacy" });
    
    // 设置页面标题
    document.title = "Privacy Policy | Nalakubara";
    
    // 添加meta标签确保页面可以被索引
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.content = "index, follow";
    } else {
      const meta = document.createElement('meta');
      meta.name = "robots";
      meta.content = "index, follow";
      document.head.appendChild(meta);
    }
    
    // 添加描述meta标签
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = "Privacy Policy for Nalakubara - Learn how we collect, use, and protect your information when you use our online gaming platform.";
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Privacy Policy for Nalakubara - Learn how we collect, use, and protect your information when you use our online gaming platform.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="privacy-page">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-date">Last Updated: October 15, 2023</p>
      
      {/* 现有内容保持不变 */}
      <div className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Nalakubara. We value your privacy and are committed to protecting your personal information. This Privacy Policy is designed to inform you about how we collect, use, disclose, and protect your personal information.
        </p>
        <p>
          By using our website and services, you agree to the practices described in this Privacy Policy. If you do not agree with any part of this policy, please do not use our website or services.
        </p>
      </div>
      
      {/* 其他部分保持不变 */}
      <div className="privacy-section">
        <h2>2. Information Collection</h2>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li>
            <strong>Personal Identification Information:</strong> When you register an account, participate in competitions, or contact us, we may collect your name, email address, username, and password.
          </li>
          <li>
            <strong>Usage Data:</strong> We automatically collect information about how you use our website, including pages visited, links clicked, game time, and preferences.
          </li>
          <li>
            <strong>Device Information:</strong> We may collect information about the device you use, including IP address, browser type, operating system, and device identifiers.
          </li>
          <li>
            <strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect information and improve your experience.
          </li>
        </ul>
      </div>
      
      {/* 其余部分保持不变 */}
    </div>
  );
};

export default PrivacyPage;
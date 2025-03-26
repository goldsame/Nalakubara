import React from 'react';
import './FeatureBar.css';

const FeatureBar = () => {
  return (
    <div className="feature-bar">
      <div className="feature-container">
        <div className="feature-item">
          <i className="feature-icon games-icon"></i>
          <span>4000多个游戏</span>
        </div>
        <div className="feature-item">
          <i className="feature-icon install-icon"></i>
          <span>无需安装</span>
        </div>
        <div className="feature-item">
          <i className="feature-icon device-icon"></i>
          <span>在任何设备上</span>
        </div>
        <div className="feature-item">
          <i className="feature-icon friends-icon"></i>
          <span>和朋友一起玩</span>
        </div>
        <div className="feature-item">
          <i className="feature-icon free-icon"></i>
          <span>全部免费</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
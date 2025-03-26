import React, { useState } from 'react';
import './GameFrame.css';

const GameFrame = ({ gameUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    const gameFrame = document.querySelector('.game-frame-container');
    
    if (!document.fullscreenElement) {
      if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
      } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
      } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`game-frame-container ${isFullscreen ? 'fullscreen' : ''}`}>
      {isLoading && (
        <div className="game-loading">
          <div className="spinner"></div>
          <p>游戏加载中...</p>
        </div>
      )}
      <div className="game-controls">
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          {isFullscreen ? '退出全屏' : '全屏模式'}
        </button>
      </div>
      <iframe
        src={gameUrl}
        title={title}
        className="game-iframe"
        allowFullScreen
        onLoad={handleIframeLoad}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      ></iframe>
    </div>
  );
};

export default GameFrame;
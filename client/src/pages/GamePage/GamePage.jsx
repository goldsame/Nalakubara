import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GamePage.css';
import gamesData from '../../data/games.json';

const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // 从JSON数据中查找游戏
    const findGame = () => {
      setLoading(true);
      try {
        const foundGame = gamesData.find(g => g.id === gameId);
        console.log('找到游戏:', foundGame);
        setGame(foundGame || null);
      } catch (error) {
        console.error('获取游戏数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    findGame();
  }, [gameId]);

  // 处理iframe加载完成
  const handleIframeLoad = () => {
    console.log('iframe加载完成');
    setIframeLoaded(true);
  };

  // 处理iframe加载错误
  const handleIframeError = (error) => {
    console.error('iframe加载失败:', error);
  };

  if (loading) {
    return (
      <div className="game-page loading">
        <div className="loading-spinner"></div>
        <p>加载游戏中...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-page not-found">
        <h1>游戏未找到</h1>
        <p>抱歉，我们找不到您请求的游戏。</p>
      </div>
    );
  }

  return (
    <div className="game-page">
      <h1 className="game-title">{game.title}</h1>
      <div className="game-info">
        <span className="game-category">{game.category}</span>
        <span className="game-rating">★ {game.rating}</span>
        <span className="game-plays">{game.plays} 次游玩</span>
      </div>
      
      <div className="game-container">
        {!iframeLoaded && (
          <div className="iframe-loading">
            <div className="loading-spinner"></div>
            <p>游戏加载中...</p>
          </div>
        )}
        <iframe
          src={game.gameUrl}
          title={game.title}
          className={`game-iframe ${iframeLoaded ? 'loaded' : ''}`}
          allowFullScreen
          allow="autoplay; fullscreen; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; magnetometer; clipboard-read; clipboard-write;"
          frameBorder="0"
          scrolling="no"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
      
      <div className="game-description">
        <h2>游戏描述</h2>
        <p>{game.description}</p>
      </div>
      
      {game.instructions && (
        <div className="game-instructions">
          <h2>操作说明</h2>
          <p>{game.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default GamePage;
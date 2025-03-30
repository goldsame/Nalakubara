import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GamePage.css';
import gamesData from '../../data/games.json';
import { getGamePlayCount } from '../../utils/gameUtils';

const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playCount, setPlayCount] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // 分类名称映射（中文到英文）
  const categoryNames = {
    'action': 'Action',
    'adventure': 'Adventure',
    'puzzle': 'Puzzle',
    'shooting': 'Shooting',
    'racing': 'Racing',
    'strategy': 'Strategy',
    'multiplayer': 'Multiplayer',
    'io': 'IO',
    'sports': 'Sports',
    '2player': '2 Player',
    'basketball': 'Basketball',
    'beauty': 'Beauty',
    'bike': 'Bike',
    'car': 'Car',
    'card': 'Card',
    'casual': 'Casual',
    'clicker': 'Clicker',
    'controller': 'Controller',
    'dressup': 'Dress Up',
    'driving': 'Driving',
    'escape': 'Escape',
    'flash': 'Flash',
    'fps': 'FPS',
    'horror': 'Horror',
    'mahjong': 'Mahjong',
    'minecraft': 'Minecraft',
    'pool': 'Pool',
    'soccer': 'Soccer',
    'stickman': 'Stickman',
    'tower-defense': 'Tower Defense'
  };

  useEffect(() => {
    // 从JSON数据中查找游戏
    const findGame = () => {
      setLoading(true);
      try {
        const foundGame = gamesData.find(g => g.id === gameId);
        console.log('找到游戏:', foundGame);
        setGame(foundGame || null);
        
        // 如果找到游戏，更新游玩次数
        if (foundGame) {
          // 使用统一的方式获取游玩次数，并增加计数
          const count = getGamePlayCount(foundGame, true);
          setPlayCount(count);
        }
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
        <p>Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-page not-found">
        <h1>Game Not Found</h1>
        <p>Sorry, we couldn't find the game you requested.</p>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-details">
        <div className="game-header">
          <h1>{game.title}</h1>
          <div className="game-meta">
            <span className="game-category">{categoryNames[game.category] || game.category}</span>
            <span className="game-rating">Rating: {game.rating}</span>
            <span className="game-plays">Plays: {game.playCount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="game-container">
          <iframe
            src={game.embedUrl}
            title={game.title}
            className="game-iframe"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          ></iframe>
        </div>
        
        <div className="game-info">
          <div className="game-description">
            <h2>Description</h2>
            <p>{game.description}</p>
          </div>
          
          <div className="game-instructions">
            <h2>How to Play</h2>
            <p>{game.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
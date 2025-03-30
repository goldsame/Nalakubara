import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gamesData from '../../data/games.json';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载游戏详情
    const loadGameDetail = () => {
      setLoading(true);
      try {
        // 查找对应ID的游戏
        const foundGame = gamesData.find(g => g.id.toString() === id);
        setGame(foundGame);
        setLoading(false);
      } catch (error) {
        console.error('加载游戏详情失败:', error);
        setLoading(false);
      }
    };

    loadGameDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="game-detail-loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (!game) {
    return <div className="game-not-found">未找到游戏</div>;
  }

  return (
    <div className="game-detail-page">
      <div className="game-detail-container">
        <h1 className="game-title">{game.title}</h1>
        
        <div className="game-meta-info">
          <div className="game-categories">
            {game.categories && game.categories.map(category => (
              <span key={category} className="game-category">{category}</span>
            ))}
          </div>
          <div className="game-stats">
            <div className="game-rating">
              <span className="star-icon">★</span>
              <span>{game.rating || '4.3'}</span>
            </div>
            <div className="game-plays">
              <span className="plays-icon">👁</span>
              <span>{game.plays || '50,002'} 次游玩</span>
            </div>
          </div>
        </div>
        
        {/* 游戏内容区域 - 添加iframe来显示游戏 */}
        <div className="game-content">
          <iframe 
            src={game.gameUrl || game.url} 
            title={game.title}
            className="game-iframe"
            allowFullScreen
            allow="fullscreen; autoplay; encrypted-media"
            frameBorder="0"
          ></iframe>
        </div>
        
        {/* 删除了游戏封面图片 */}
        
        <div className="game-description">
          <h2>游戏介绍</h2>
          <p>{game.description || '这是一个精彩的游戏，快来体验吧！'}</p>
        </div>
        
        <div className="game-instructions">
          <h2>游戏说明</h2>
          <p>{game.instructions || '使用键盘和鼠标控制游戏。'}</p>
        </div>
        
        {game.relatedGames && game.relatedGames.length > 0 && (
          <div className="related-games">
            <h2>相关游戏</h2>
            <div className="related-games-grid">
              {game.relatedGames.map(relatedGame => (
                <div key={relatedGame.id} className="related-game-card">
                  <img src={relatedGame.imageUrl} alt={relatedGame.title} />
                  <h3>{relatedGame.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
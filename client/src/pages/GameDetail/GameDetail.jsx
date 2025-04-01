import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gamesData from '../../data/games.json';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 确保页面滚动到顶部
    window.scrollTo(0, 0);
    
    // 加载游戏详情
    const loadGameDetail = () => {
      setLoading(true);
      try {
        // 查找对应ID的游戏
        const foundGame = gamesData.find(g => g.id.toString() === id);
        
        if (foundGame) {
          // 从localStorage获取游戏计数数据
          const gameCountsStr = localStorage.getItem('gameCounts') || '{}';
          const gameCounts = JSON.parse(gameCountsStr);
          
          // 获取当前游戏的计数，如果不存在则使用JSON中的初始值
          let currentCount = gameCounts[foundGame.id] || foundGame.playCount || 0;
          
          // 增加游玩次数
          currentCount += 1;
          
          // 更新localStorage
          gameCounts[foundGame.id] = currentCount;
          localStorage.setItem('gameCounts', JSON.stringify(gameCounts));
          
          // 更新游戏对象
          const updatedGame = { ...foundGame, playCount: currentCount };
          setGame(updatedGame);
        } else {
          setGame(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load game details:', error);
        setLoading(false);
      }
    };

    loadGameDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="game-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!game) {
    return <div className="game-not-found">Game Not Found</div>;
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
              <span>{(game.playCount || 0).toLocaleString()} plays</span>
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
          <h2>Game Description</h2>
          <p>{game.description || 'This is an exciting game, come and experience it!'}</p>
        </div>
        
        <div className="game-instructions">
          <h2>Game Instructions</h2>
          <p>{game.instructions || 'Use keyboard and mouse to control the game.'}</p>
        </div>
        
        {game.relatedGames && game.relatedGames.length > 0 && (
          <div className="related-games">
            <h2>Related Games</h2>
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
import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  // 防止空对象导致错误
  if (!game) {
    return <div className="game-card empty">数据加载中...</div>;
  }

  // 创建一个默认图片的占位符
  const renderImagePlaceholder = () => {
    try {
      const initial = (game.title || 'G').charAt(0).toUpperCase();
      return (
        <div className="game-image-placeholder">
          <span>{initial}</span>
        </div>
      );
    } catch (error) {
      return (
        <div className="game-image-placeholder">
          <span>G</span>
        </div>
      );
    }
  };

  return (
    <Link to={`/games/${game.id || 'unknown'}`} className="game-card">
      <div className="game-image">
        {game.imageUrl ? (
          <img 
            src={game.imageUrl} 
            alt={game.title || '游戏'} 
            onError={(e) => {
              try {
                e.target.style.display = 'none';
                const placeholder = renderImagePlaceholder();
                e.target.parentNode.appendChild(placeholder);
              } catch (error) {
                console.error('处理图片错误失败:', error);
              }
            }}
          />
        ) : renderImagePlaceholder()}
        <div className="game-rating">
          <span>★ {game.rating || '4.0'}</span>
        </div>
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title || '未命名游戏'}</h3>
        <p className="game-plays">{(game.plays || 0).toLocaleString()} 次游玩</p>
      </div>
    </Link>
  );
};

export default GameCard;
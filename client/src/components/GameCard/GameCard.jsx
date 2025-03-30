import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  // 处理图片URL，移除宽度参数
  let imageSrc = '';
  if (game.imageUrl && !game.imageUrl.includes('placeholder.com')) {
    // 使用正则表达式移除width参数
    imageSrc = game.imageUrl.replace(/(\?|&)width=\d+/g, '');
    
    // 如果URL中没有其他参数，确保不留下单独的问号
    imageSrc = imageSrc.replace(/\?$/g, '');
  } else {
    imageSrc = '/images/placeholder-game.jpg';
  }

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-image-container">
        <img 
          src={imageSrc} 
          alt={game.title} 
          className="game-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-game.jpg';
          }}
        />
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <div className="game-meta">
          <span className="game-plays">{(game.playCount || 0).toLocaleString()} 次游戏</span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
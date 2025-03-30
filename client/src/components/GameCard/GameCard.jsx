import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const [playCount, setPlayCount] = useState(game.playCount || 0);
  
  useEffect(() => {
    // 从localStorage获取最新的游戏计数
    const updatePlayCount = () => {
      try {
        const gameCountsStr = localStorage.getItem('gameCounts') || '{}';
        const gameCounts = JSON.parse(gameCountsStr);
        
        // 如果localStorage中有该游戏的计数，则使用它
        if (gameCounts[game.id]) {
          setPlayCount(gameCounts[game.id]);
        }
      } catch (error) {
        console.error('Error reading game counts:', error);
      }
    };
    
    // 初始加载时更新一次
    updatePlayCount();
    
    // 设置事件监听器，当localStorage变化时更新计数
    const handleStorageChange = () => updatePlayCount();
    window.addEventListener('storage', handleStorageChange);
    
    // 清理函数
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [game.id]);
  
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
          <span className="game-plays">{playCount.toLocaleString()} plays</span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
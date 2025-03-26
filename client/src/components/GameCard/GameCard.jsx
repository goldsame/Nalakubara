import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';
import { getGamePlayCount } from '../../utils/gameUtils';

const GameCard = ({ game }) => {
  // 添加本地状态来存储游玩次数
  const [displayPlayCount, setDisplayPlayCount] = useState(0);
  
  // 所有的hooks必须在条件判断之前调用
  useEffect(() => {
    // 确保game存在
    if (!game || !game.id) return;
    
    // 使用统一的方式获取游玩次数，但不增加计数
    const count = getGamePlayCount(game, false);
    setDisplayPlayCount(count);
    
  }, [game]); // 依赖改为整个game对象
  
  // 防止空对象导致错误 - 移到hooks之后
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
        <p className="game-plays">{displayPlayCount} 次游玩</p>
      </div>
    </Link>
  );
};

export default GameCard;
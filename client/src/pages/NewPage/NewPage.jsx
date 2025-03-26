import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './NewPage.css';
import gamesData from '../../data/games.json';

const NewPage = () => {
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载新游戏
    const loadNewGames = () => {
      setLoading(true);
      try {
        // 筛选新游戏
        const newG = gamesData.filter(game => game.isNew);
        setNewGames(newG);
        setLoading(false);
      } catch (error) {
        console.error('加载新游戏失败:', error);
        setLoading(false);
      }
    };

    loadNewGames();
  }, []);

  // 渲染骨架屏
  const renderSkeletons = (count) => {
    return Array(count).fill().map((_, index) => (
      <div key={index} className="loading-card">
        <div className="skeleton" style={{ height: '180px' }}></div>
        <div style={{ padding: '15px' }}>
          <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '10px' }}></div>
          <div className="skeleton" style={{ height: '15px', width: '50%' }}></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="new-page">
      <h1>新游戏</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) : 
          newGames.length > 0 ? newGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">暂无新游戏</div>
          )
        }
      </div>
    </div>
  );
};

export default NewPage;
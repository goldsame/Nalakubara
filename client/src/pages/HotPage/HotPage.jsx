import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import gamesData from '../../data/games.json';
import './HotPage.css'; // 如果有的话

const HotPage = () => {
  const [hotGames, setHotGames] = useState([]); // 确保使用正确的状态变量名
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotGames = () => {
      setLoading(true);
      try {
        // 筛选热门游戏并倒序排列
        const hotGames = [...gamesData]
          .filter(game => game.isPopular)
          .reverse();
        setHotGames(hotGames); // 使用setHotGames而不是setGames
        setLoading(false);
      } catch (error) {
        console.error('加载热门游戏失败:', error);
        setLoading(false);
      }
    };

    loadHotGames();
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
    <div className="hot-page">
      <h1>Hot Games</h1>
      <div className="games-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        marginTop: '20px', 
        width: '100%' 
      }}>
        {loading ? renderSkeletons(12) : 
          hotGames.length > 0 ? hotGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">No hot games available</div>
          )
        }
      </div>
    </div>
  );
};

export default HotPage;
import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './HotPage.css';
import gamesData from '../../data/games.json';

const HotPage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载热门游戏
    const loadPopularGames = () => {
      setLoading(true);
      try {
        // 筛选热门游戏
        const popular = gamesData.filter(game => game.isPopular);
        setPopularGames(popular);
        setLoading(false);
      } catch (error) {
        console.error('加载热门游戏失败:', error);
        setLoading(false);
      }
    };

    loadPopularGames();
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
      <h1>热门游戏</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) : 
          popularGames.length > 0 ? popularGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">暂无热门游戏</div>
          )
        }
      </div>
    </div>
  );
};

export default HotPage;
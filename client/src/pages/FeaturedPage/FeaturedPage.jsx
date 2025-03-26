import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './FeaturedPage.css';
import gamesData from '../../data/games.json';

const FeaturedPage = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载精选游戏
    const loadFeaturedGames = () => {
      setLoading(true);
      try {
        // 筛选精选游戏
        const featured = gamesData.filter(game => game.isFeatured);
        setFeaturedGames(featured);
        setLoading(false);
      } catch (error) {
        console.error('加载精选游戏失败:', error);
        setLoading(false);
      }
    };

    loadFeaturedGames();
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
    <div className="featured-page">
      <h1>精选游戏</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) : 
          featuredGames.length > 0 ? featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">暂无精选游戏</div>
          )
        }
      </div>
    </div>
  );
};

export default FeaturedPage;
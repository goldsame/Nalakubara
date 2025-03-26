import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import GameCard from '../../components/GameCard/GameCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import gamesData from '../../data/games.json';

const HomePage = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 确保分类ID与JSON中的category值匹配
  const categories = [
    { id: 'action', name: '动作', icon: '⚡' },
    { id: 'adventure', name: '冒险', icon: '🗺️' },
    { id: 'arcade', name: '街机', icon: '🕹️' },
    { id: 'io', name: 'IO游戏', icon: '🌐' },
    { id: 'multiplayer', name: '多人', icon: '👥' },
    { id: 'puzzle', name: '益智', icon: '🧩' },
    { id: 'racing', name: '赛车', icon: '🏎️' },
    { id: 'sports', name: '体育', icon: '⚽' },
    { id: 'shooting', name: '射击', icon: '🎯' },
    { id: 'strategy', name: '策略', icon: '♟️' }
  ];
  
  useEffect(() => {
    const loadGames = () => {
      setLoading(true);
      try {
        // 筛选游戏
        const featured = gamesData.filter(game => game.isFeatured);
        const popular = gamesData.filter(game => game.isPopular);
        const newG = gamesData.filter(game => game.isNew);
        
        // 设置状态
        setFeaturedGames(featured.slice(0, 4));
        setPopularGames(popular.slice(0, 8));
        setNewGames(newG.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('加载游戏失败:', error);
        setLoading(false);
      }
    };
    
    loadGames();
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
    <div className="home-page">
      {/* 特色游戏轮播 */}
      <section className="featured-section">
        <div className="section-header">
          <h2>精选游戏</h2>
          <Link to="/featured" className="view-all">查看全部</Link>
        </div>
        
        <div className="featured-games">
          {loading ? renderSkeletons(4) : 
            featuredGames.length > 0 ? featuredGames.map(game => (
              <GameCard key={game.id} game={game} />
            )) : (
              <div className="empty-message">暂无精选游戏</div>
            )
          }
        </div>
      </section>
      
      {/* 游戏分类 */}
      <section className="categories-section">
        <div className="section-header">
          <h2>游戏分类</h2>
          <Link to="/categories" className="view-all">查看全部</Link>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              id={category.id} 
              name={category.name} 
              icon={category.icon} 
            />
          ))}
        </div>
      </section>
      
      {/* 热门游戏 */}
      <section className="popular-section">
        <div className="section-header">
          <h2>热门游戏</h2>
          <Link to="/hot" className="view-all">查看全部</Link>
        </div>
        
        <div className="games-grid">
          {loading ? renderSkeletons(8) : 
            popularGames.length > 0 ? popularGames.map(game => (
              <GameCard key={game.id} game={game} />
            )) : (
              <div className="empty-message">暂无热门游戏</div>
            )
          }
        </div>
      </section>
      
      {/* 新游戏 */}
      <section className="new-section">
        <div className="section-header">
          <h2>新游戏</h2>
          <Link to="/new" className="view-all">查看全部</Link>
        </div>
        
        <div className="games-grid">
          {loading ? renderSkeletons(8) : 
            newGames.length > 0 ? newGames.map(game => (
              <GameCard key={game.id} game={game} />
            )) : (
              <div className="empty-message">暂无新游戏</div>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default HomePage;
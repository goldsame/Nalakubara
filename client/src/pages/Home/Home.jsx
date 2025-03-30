import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import gamesData from '../../data/games.json';
import './Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategories, setActiveCategories] = useState([]);
  
  // 定义所有可能的游戏分类（英文版）
  const allCategories = [
    { id: 'action', name: 'Action', icon: '⚡' },
    { id: 'adventure', name: 'Adventure', icon: '🌍' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'shooting', name: 'Shooting', icon: '🎯' },
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'multiplayer', name: 'Multiplayer', icon: '👥' },
    { id: 'io', name: 'IO', icon: '🌐' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    // 添加图片中显示的新分类
    { id: '2player', name: '2 Player', icon: '👫' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
    { id: 'bike', name: 'Bike', icon: '🚲' },
    { id: 'car', name: 'Car', icon: '🚗' },
    { id: 'card', name: 'Card', icon: '🃏' },
    { id: 'casual', name: 'Casual', icon: '🎮' },
    { id: 'clicker', name: 'Clicker', icon: '👆' },
    { id: 'controller', name: 'Controller', icon: '🎮' },
    { id: 'dressup', name: 'Dress Up', icon: '👗' },
    { id: 'driving', name: 'Driving', icon: '🚙' },
    { id: 'escape', name: 'Escape', icon: '🚪' },
    { id: 'flash', name: 'Flash', icon: '⚡' },
    { id: 'fps', name: 'FPS', icon: '🔫' },
    { id: 'horror', name: 'Horror', icon: '👻' },
    { id: 'mahjong', name: 'Mahjong', icon: '🀄' },
    { id: 'minecraft', name: 'Minecraft', icon: '⛏️' },
    { id: 'pool', name: 'Pool', icon: '🎱' },
    { id: 'soccer', name: 'Soccer', icon: '⚽' },
    { id: 'stickman', name: 'Stickman', icon: '🏃' },
    { id: 'tower-defense', name: 'Tower Defense', icon: '🏰' }
  ];
  
  useEffect(() => {
    // 加载游戏数据
    const loadGames = () => {
      setLoading(true);
      try {
        // 倒序排列游戏数据
        const reversedGames = [...gamesData].reverse();
        setGames(reversedGames);
        
        // 筛选热门游戏
        setPopularGames(reversedGames.filter(game => game.isPopular));
        
        // 筛选新游戏
        setNewGames(reversedGames.filter(game => game.isNew));
        
        // 获取有游戏的分类
        const categoriesSet = new Set();
        reversedGames.forEach(game => {
          if (game.category) {
            categoriesSet.add(game.category);
          }
        });
        
        // 只保留有游戏的分类
        const activeCats = allCategories.filter(category => 
          categoriesSet.has(category.id)
        );
        
        setActiveCategories(activeCats);
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

  // 在每个游戏网格部分添加内联样式
  return (
    <div className="home-page">
      {/* 热门游戏 */}
      <section className="game-section">
        <div className="section-header">
          <h2>Hot Games</h2>
          <Link to="/hot" className="view-all">View All</Link>
        </div>
        <div className="games-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px',
          width: '100%'
        }}>
          {loading ? renderSkeletons(4) :
            popularGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          }
        </div>
      </section>

      {/* 游戏分类 - 更新为英文并只显示有游戏的分类 */}
      <section className="game-section">
        <div className="section-header">
          <h2>Categories</h2>
        </div>
        <div className="categories-grid">
          {activeCategories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 新游戏 */}
      <section className="game-section">
        <div className="section-header">
          <h2>New Games</h2>
          <Link to="/new" className="view-all">View All</Link>
        </div>
        <div className="games-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px',
          width: '100%'
        }}>
          {loading ? renderSkeletons(4) :
            newGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default Home;
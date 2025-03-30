import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import gamesData from '../../data/games.json';
// 移除CSS导入
// import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryGames, setCategoryGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Category name mapping (Chinese to English)
  const categoryNames = {
    'action': 'Action',
    'adventure': 'Adventure',
    'puzzle': 'Puzzle',
    'shooting': 'Shooting',
    'racing': 'Racing',
    'strategy': 'Strategy',
    'multiplayer': 'Multiplayer',
    'io': 'IO',
    'sports': 'Sports',
    '2player': '2 Player',
    'basketball': 'Basketball',
    'beauty': 'Beauty',
    'bike': 'Bike',
    'car': 'Car',
    'card': 'Card',
    'casual': 'Casual',
    'clicker': 'Clicker',
    'controller': 'Controller',
    'dressup': 'Dress Up',
    'driving': 'Driving',
    'escape': 'Escape',
    'flash': 'Flash',
    'fps': 'FPS',
    'horror': 'Horror',
    'mahjong': 'Mahjong',
    'minecraft': 'Minecraft',
    'pool': 'Pool',
    'soccer': 'Soccer',
    'stickman': 'Stickman',
    'tower-defense': 'Tower Defense'
  };

  useEffect(() => {
    const loadCategoryGames = () => {
      setLoading(true);
      try {
        // 筛选该分类的游戏并倒序排列
        const games = [...gamesData]
          .filter(game => game.category === categoryId)
          .reverse();
        setCategoryGames(games);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load category games:', error);
        setLoading(false);
      }
    };

    loadCategoryGames();
  }, [categoryId]);

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

  // 页面样式
  const pageStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333'
  };

  const gamesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  const emptyMessageStyle = {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>{categoryNames[categoryId] || 'Category'} Games</h1>
      <div style={gamesGridStyle}>
        {loading ? renderSkeletons(12) :
          categoryGames.length > 0 ? categoryGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div style={emptyMessageStyle}>No games in this category</div>
          )
        }
      </div>
    </div>
  );
};

export default CategoryPage;
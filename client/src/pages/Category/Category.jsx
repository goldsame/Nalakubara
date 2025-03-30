// 添加CSS导入
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import gamesData from '../../data/games.json';
import './Category.css'; // 导入CSS文件

const Category = () => {
  const { categoryId } = useParams();
  const [categoryGames, setCategoryGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // 加载分类游戏
    const loadCategoryGames = () => {
      setLoading(true);
      try {
        // 筛选当前分类的游戏
        const games = gamesData.filter(game => game.category === categoryId);
        setCategoryGames(games);
        
        // 设置分类名称
        const categories = {
          'action': '动作',
          'adventure': '冒险',
          'arcade': '街机',
          'io': 'IO游戏',
          'multiplayer': '多人',
          'puzzle': '益智',
          'racing': '赛车',
          'sports': '体育',
          'shooting': '射击',
          'strategy': '策略'
        };
        setCategoryName(categories[categoryId] || categoryId);
        
        setLoading(false);
      } catch (error) {
        console.error('加载分类游戏失败:', error);
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

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) : 
          categoryGames.length > 0 ? categoryGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">该分类暂无游戏</div>
          )
        }
      </div>
    </div>
  );
};

export default Category;
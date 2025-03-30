// 修改导入路径
import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard'; // 使用src目录内的GameCard
import gamesData from '../../data/games.json';
import './NewPage.css'; // 如果有的话

const NewPage = () => {
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // 在加载新游戏的地方
  useEffect(() => {
    const loadNewGames = () => {
      setLoading(true);
      try {
        // 筛选新游戏并倒序排列
        const newGames = [...gamesData]
          .filter(game => game.isNew)
          .reverse();
        setNewGames(newGames); // 修正这里：使用setNewGames而不是setGames
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
      <h1>New Games</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) :
          newGames.length > 0 ? newGames.map(game => (
            <GameCard key={game.id} game={game} />
          )) : (
            <div className="empty-message">No new games available</div>
          )
        }
      </div>
    </div>
  );
};

export default NewPage;
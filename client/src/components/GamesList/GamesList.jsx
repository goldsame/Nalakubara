import React from 'react';
import GameCard from '../GameCard/GameCard';
import './GamesList.css';

const GamesList = ({ games, title, loading, error }) => {
  if (loading) {
    return (
      <div className="games-list-loading">
        <div className="spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-list-error">
        <p>加载游戏时出错: {error}</p>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="games-list-empty">
        <p>没有找到游戏</p>
      </div>
    );
  }

  return (
    <div className="games-list">
      {title && <h2 className="games-list-title">{title}</h2>}
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
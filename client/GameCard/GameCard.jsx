import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-thumbnail">
        <img src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-info">
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
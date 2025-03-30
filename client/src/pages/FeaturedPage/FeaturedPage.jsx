import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gamesData from '../../data/games.json';
import './FeaturedPage.css';

const FeaturedPage = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define inline styles
  const gameCardStyle = {
    width: '100%',
    height: 'auto',
    minWidth: '0',
    maxWidth: 'none'
  };
  
  const gameImageContainerStyle = {
    width: '100%',
    height: 'auto'
  };
  
  const gameImageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  };

  useEffect(() => {
    // Load featured games
    const loadFeaturedGames = () => {
      setLoading(true);
      try {
        // Filter featured games and reverse order
        const games = [...gamesData]
          .filter(game => game.isFeatured)
          .reverse();
        setFeaturedGames(games); // Make sure to use the correct setState function
        setLoading(false);
      } catch (error) {
        console.error('Failed to load featured games:', error);
        setLoading(false);
      }
    };

    loadFeaturedGames();
  }, []);

  // Render skeleton loading screens
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
      <h1>Featured Games</h1>
      <div className="games-grid">
        {loading ? renderSkeletons(12) :
          featuredGames.length > 0 ? featuredGames.map(game => (
            <Link to={`/game/${game.id}`} key={game.id} className="game-card" style={gameCardStyle}>
              <div className="game-image-container" style={gameImageContainerStyle}>
                <img src={game.thumbnailUrl} alt={game.title} style={gameImageStyle} />
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-category">{game.category}</p>
              </div>
            </Link>
          )) : (
            <div className="empty-message">No featured games available</div>
          )
        }
      </div>
    </div>
  );
};

export default FeaturedPage;

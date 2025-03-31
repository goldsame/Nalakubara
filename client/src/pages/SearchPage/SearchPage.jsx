import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import GameCard from '../../components/GameCard/GameCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 设置页面标题
  useEffect(() => {
    document.title = "Search - Nalakubara";
  }, []);

  useEffect(() => {
    const searchGames = async () => {
      setLoading(true);
      try {
        // This should be the actual API call
        // Simulating search results
        const mockGames = Array(Math.floor(Math.random() * 8) + 1).fill().map((_, index) => ({
          id: `search-${index + 1}`,
          title: `${query} Game ${index + 1}`,
          image: `/game-${index + 1}.jpg`,
          category: index % 2 === 0 ? 'action' : 'adventure',
          rating: (4 + Math.random()).toFixed(1),
          plays: Math.floor(Math.random() * 10000)
        }));

        // Simulating network delay
        setTimeout(() => {
          setGames(mockGames);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to search games:', error);
        setLoading(false);
      }
    };

    if (query) {
      searchGames();
    } else {
      setGames([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results: "{query}"</h1>
        <p>Found {games.length} games</p>
      </div>

      <div className="game-grid">
        {loading ? (
          // Using skeleton layout
          Array(4).fill().map((_, index) => (
            <div key={index} className="loading-card">
              <div className="skeleton" style={{ height: '180px' }}></div>
              <div style={{ padding: '15px' }}>
                <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '10px' }}></div>
                <div className="skeleton" style={{ height: '15px', width: '50%' }}></div>
              </div>
            </div>
          ))
        ) : games.length > 0 ? (
          games.map(game => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="empty-message">
            No games found related to "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
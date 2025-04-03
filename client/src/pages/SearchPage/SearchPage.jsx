import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import GameCard from '../../components/GameCard/GameCard';
import gamesData from '../../data/games.json'; // 导入实际的游戏数据

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 设置页面标题
  useEffect(() => {
    document.title = `Search: ${query} - Nalakubara`;
  }, [query]);

  useEffect(() => {
    const searchGames = async () => {
      setLoading(true);
      try {
        // 使用实际的游戏数据进行搜索
        const searchResults = gamesData.filter(game => {
          const searchTerm = query.toLowerCase();
          return (
            game.title.toLowerCase().includes(searchTerm) ||
            (game.description && game.description.toLowerCase().includes(searchTerm)) ||
            (game.category && game.category.toLowerCase().includes(searchTerm))
          );
        });

        // 模拟网络延迟，可以移除
        setTimeout(() => {
          setGames(searchResults);
          setLoading(false);
        }, 300);
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
          // 使用骨架布局
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
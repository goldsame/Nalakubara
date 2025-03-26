import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import GameCard from '../../components/GameCard/GameCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const searchGames = async () => {
      setLoading(true);
      try {
        // 这里应该是实际的API调用
        // 模拟搜索结果
        const mockGames = Array(Math.floor(Math.random() * 8) + 1).fill().map((_, index) => ({
          id: `search-${index + 1}`,
          title: `${query} 游戏 ${index + 1}`,
          image: `/game-${index + 1}.jpg`,
          category: index % 2 === 0 ? 'action' : 'adventure',
          rating: (4 + Math.random()).toFixed(1),
          plays: Math.floor(Math.random() * 10000)
        }));
        
        // 模拟网络延迟
        setTimeout(() => {
          setGames(mockGames);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('搜索游戏失败:', error);
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
        <h1>搜索结果: "{query}"</h1>
        <p>找到 {games.length} 个游戏</p>
      </div>
      
      <div className="game-grid">
        {loading ? (
          // 使用骨架屏
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
            没有找到与 "{query}" 相关的游戏
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
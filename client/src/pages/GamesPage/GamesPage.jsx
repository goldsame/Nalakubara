import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gameApi } from '../../services/api';
import GameCard from '../../components/GameCard/GameCard';
import './GamesPage.css';

const GamesPage = () => {
  const { category } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        let response;
        
        if (category) {
          // 如果有分类参数，则按分类获取游戏
          response = await gameApi.getGamesByCategory(category);
        } else {
          // 否则获取所有游戏
          response = await gameApi.getAllGames();
        }
        
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        console.error('获取游戏列表错误:', err);
        setError('获取游戏列表失败');
        setLoading(false);
      }
    };

    fetchGames();
  }, [category]);

  const getPageTitle = () => {
    if (category) {
      // 将分类ID转换为显示名称
      const categoryNames = {
        'action': '动作游戏',
        'puzzle': '益智游戏',
        'strategy': '策略游戏',
        'sports': '体育游戏',
        'racing': '赛车游戏',
        'multiplayer': '多人游戏',
        'popular': '热门游戏',
        'new': '最新游戏'
      };
      return categoryNames[category] || `${category}游戏`;
    }
    return '热门游戏';
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="games-page">
      <h1 className="page-title">{getPageTitle()}</h1>
      
      <div className="featured-games">
        {games.length > 0 && (
          <div className="featured-game">
            <img src={games[0].thumbnail} alt={games[0].title} />
            <div className="featured-game-info">
              <h2>{games[0].title}</h2>
              <p>{games[0].description}</p>
              <a href={`/game/${games[0]._id}`} className="play-button">立即游玩</a>
            </div>
          </div>
        )}
      </div>
      
      <div className="games-grid">
        {games && games.length > 0 ? (
          games.map(game => <GameCard key={game._id} game={game} />)
        ) : (
          <p className="no-games">暂无游戏</p>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
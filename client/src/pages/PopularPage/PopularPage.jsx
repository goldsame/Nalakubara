import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './PopularPage.css';
import gamesData from '../../data/games.json';
import { getGamePlayCount } from '../../utils/gameUtils';

const PopularPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取所有游戏并按游玩次数排序
    const loadGames = () => {
      setLoading(true);
      try {
        // 检查是否正确导入了游戏数据
        console.log('所有游戏数据:', gamesData); 
        console.log('游戏数量:', gamesData.length);

        // 确保gamesData是一个数组
        const allGames = Array.isArray(gamesData) ? gamesData : [];
        
        // 为每个游戏获取当前的游玩次数
        const gamesWithPlayCount = allGames.map(game => {
          // 获取游戏的当前游玩次数（不增加计数）
          const currentPlayCount = getGamePlayCount(game, false);
          return {
            ...game,
            currentPlayCount // 添加一个新属性存储当前游玩次数
          };
        });

        // 按游玩次数从高到低排序
        const sortedGames = gamesWithPlayCount.sort((a, b) => 
          b.currentPlayCount - a.currentPlayCount
        );

        console.log('排序后的游戏:', sortedGames);
        
        // 不再筛选isPopular，直接使用所有游戏
        setGames(sortedGames);
      } catch (error) {
        console.error('加载游戏数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return (
    <div className="popular-page">
      <h1 className="page-title">热门游戏</h1>
      <p className="games-count">共 {games.length} 款游戏</p>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载游戏中...</p>
        </div>
      ) : (
        <div className="games-grid">
          {games.length > 0 ? (
            games.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <p className="no-games">暂无热门游戏</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PopularPage;
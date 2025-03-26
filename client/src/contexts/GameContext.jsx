import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: '',
  });

  // 获取游戏数据并确保最新添加的游戏显示在前面
  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      // 添加随机参数以防止缓存
      const response = await fetch('/data/games.json?v=' + Math.random());
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      let data = await response.json();
      
      // 确保数组反转，最新添加的游戏（JSON中最后的游戏）显示在前面
      // 使用slice()创建一个新数组，然后反转它，以确保不会修改原始数据
      data = data.slice().reverse();
      
      // 记录反转后的前几个游戏，以便在控制台中检查
      console.log('反转后的游戏顺序:', data.slice(0, 3).map(g => g.title));
      
      setGames(data);
      setFilteredGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载游戏数据
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // 应用过滤器
  useEffect(() => {
    if (games.length > 0) {
      let result = [...games]; // 使用已经反转过的游戏数组
      
      if (filters.category) {
        result = result.filter(game => game.category === filters.category);
      }
      
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        result = result.filter(game => 
          game.title.toLowerCase().includes(searchLower) || 
          game.description.toLowerCase().includes(searchLower)
        );
      }
      
      setFilteredGames(result);
    }
  }, [filters, games]);

  // 更新过滤器
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // 获取精选游戏（保持反转后的顺序）
  const getFeaturedGames = useCallback(() => {
    // 先过滤出精选游戏，保持反转后的顺序
    return games.filter(game => game.isFeatured);
  }, [games]);

  // 获取热门游戏（保持反转后的顺序）
  const getPopularGames = useCallback(() => {
    return games.filter(game => game.isPopular);
  }, [games]);

  // 获取新游戏（保持反转后的顺序）
  const getNewGames = useCallback(() => {
    return games.filter(game => game.isNew);
  }, [games]);

  // 按分类获取游戏（保持反转后的顺序）
  const getGamesByCategory = useCallback((category) => {
    return games.filter(game => game.category === category);
  }, [games]);

  // 获取单个游戏
  const getGameById = useCallback((id) => {
    return games.find(game => game.id === id);
  }, [games]);

  const value = {
    games,
    filteredGames,
    loading,
    error,
    filters,
    updateFilters,
    getFeaturedGames,
    getPopularGames,
    getNewGames,
    getGamesByCategory,
    getGameById,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
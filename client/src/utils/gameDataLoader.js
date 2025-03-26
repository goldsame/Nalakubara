// 创建一个统一的游戏数据加载工具
import gamesData from '../data/games.json';

// 获取反转后的游戏数据（最新添加的在前面）
export const getReversedGames = () => {
  try {
    // 创建一个新数组并反转，确保不修改原始数据
    return [...gamesData].reverse();
  } catch (error) {
    console.error('加载游戏数据失败:', error);
    return [];
  }
};

// 获取特定分类的游戏
export const getGamesByCategory = (categoryId) => {
  const reversedGames = getReversedGames();
  return reversedGames.filter(game => game.category === categoryId);
};

// 获取精选游戏
export const getFeaturedGames = () => {
  const reversedGames = getReversedGames();
  return reversedGames.filter(game => game.isFeatured);
};

// 获取热门游戏
export const getPopularGames = () => {
  const reversedGames = getReversedGames();
  return reversedGames.filter(game => game.isPopular);
};

// 获取新游戏
export const getNewGames = () => {
  const reversedGames = getReversedGames();
  return reversedGames.filter(game => game.isNew);
};
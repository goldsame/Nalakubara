// Web Worker用于在后台线程处理数据
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'PROCESS_GAMES':
      const processedGames = processGames(data);
      self.postMessage({ type: 'PROCESSED_GAMES', data: processedGames });
      break;
    case 'FILTER_BY_CATEGORY':
      const { games, category } = data;
      const filteredGames = filterGamesByCategory(games, category);
      self.postMessage({ type: 'FILTERED_GAMES', data: filteredGames });
      break;
    default:
      console.error('未知的worker操作类型:', type);
  }
};

// 处理游戏数据
function processGames(games) {
  // 这里可以进行耗时的数据处理操作
  return games.map(game => ({
    ...game,
    formattedRating: typeof game.rating === 'number' ? game.rating.toFixed(1) : '0.0',
    formattedPlays: `${game.plays || '0'} 次游玩`
  }));
}

// 按分类过滤游戏
function filterGamesByCategory(games, category) {
  if (category === 'all') return games;
  return games.filter(game => 
    game.category.toLowerCase() === category.toLowerCase()
  );
}
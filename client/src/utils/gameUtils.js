// 游戏相关的工具函数

/**
 * 获取游戏的游玩次数
 * @param {Object} game - 游戏对象
 * @param {boolean} increment - 是否增加游玩次数，默认为true
 * @returns {number} 游戏的游玩次数
 */
export function getGamePlayCount(game, increment = true) {
  if (!game || !game.id) return 0;
  
  const storageKey = `game_play_count_${game.id}`;
  
  // 从localStorage获取存储的游玩次数
  let count = localStorage.getItem(storageKey);
  
  // 如果没有存储的次数，使用游戏原始的playCount或默认值
  if (!count) {
    count = game.playCount ? parseInt(game.playCount, 10) : 100;
    // 存储初始值
    localStorage.setItem(storageKey, count.toString());
  } else {
    count = parseInt(count, 10);
  }
  
  // 如果需要增加游玩次数
  if (increment) {
    const newCount = count + 1;
    localStorage.setItem(storageKey, newCount.toString());
    return newCount;
  }
  
  return count;
}
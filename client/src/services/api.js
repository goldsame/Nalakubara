// 模拟游戏数据
const gamesData = [
  {
    _id: '1',
    title: '像素冒险',
    description: '一款精彩的像素风格冒险游戏，探索神秘世界，收集宝藏，打败敌人。',
    category: 'adventure',
    thumbnail: 'https://via.placeholder.com/300x200/7b68ee/ffffff?text=像素冒险',
    gameUrl: 'https://example.com/games/pixel-adventure',
    rating: 4.8,
    plays: 12500,
    tags: ['冒险', '像素', '单人'],
    createdAt: '2023-01-15'
  },
  {
    _id: '2',
    title: '赛车狂飙',
    description: '体验极速赛车的刺激，在各种赛道上与对手一较高下，解锁更多赛车和赛道。',
    category: 'racing',
    thumbnail: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=赛车狂飙',
    gameUrl: 'https://example.com/games/racing-fever',
    rating: 4.5,
    plays: 9800,
    tags: ['赛车', '竞速', '多人'],
    createdAt: '2023-02-20'
  },
  {
    _id: '3',
    title: '方块消除',
    description: '经典的方块消除游戏，考验你的反应速度和策略思维，挑战高分。',
    category: 'puzzle',
    thumbnail: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=方块消除',
    gameUrl: 'https://example.com/games/block-blast',
    rating: 4.2,
    plays: 15600,
    tags: ['益智', '休闲', '单人'],
    createdAt: '2023-03-10'
  },
  {
    _id: '4',
    title: '僵尸射击',
    description: '在末日世界中生存，与成群的僵尸作战，收集武器和资源，保护你的基地。',
    category: 'shooting',
    thumbnail: 'https://via.placeholder.com/300x200/f7b731/ffffff?text=僵尸射击',
    gameUrl: 'https://example.com/games/zombie-shooter',
    rating: 4.7,
    plays: 18200,
    tags: ['射击', '动作', '生存'],
    createdAt: '2023-04-05'
  },
  {
    _id: '5',
    title: '城市建设',
    description: '建造和管理你自己的城市，平衡资源，满足市民需求，发展经济和基础设施。',
    category: 'strategy',
    thumbnail: 'https://via.placeholder.com/300x200/a55eea/ffffff?text=城市建设',
    gameUrl: 'https://example.com/games/city-builder',
    rating: 4.4,
    plays: 7300,
    tags: ['策略', '模拟', '建设'],
    createdAt: '2023-05-12'
  },
  {
    _id: '6',
    title: '足球明星',
    description: '体验真实的足球比赛，控制你的球员，射门得分，赢得比赛和锦标赛。',
    category: 'sports',
    thumbnail: 'https://via.placeholder.com/300x200/2d98da/ffffff?text=足球明星',
    gameUrl: 'https://example.com/games/soccer-star',
    rating: 4.6,
    plays: 11000,
    tags: ['体育', '足球', '多人'],
    createdAt: '2023-06-18'
  },
  {
    _id: '7',
    title: '魔法塔防',
    description: '使用各种魔法塔防御敌人的进攻，升级你的塔，解锁新的魔法和能力。',
    category: 'strategy',
    thumbnail: 'https://via.placeholder.com/300x200/eb3b5a/ffffff?text=魔法塔防',
    gameUrl: 'https://example.com/games/magic-tower',
    rating: 4.3,
    plays: 8500,
    tags: ['塔防', '策略', '魔法'],
    createdAt: '2023-07-22'
  },
  {
    _id: '8',
    title: '多人对战',
    description: '与全球玩家实时对战，展示你的技巧，赢得胜利，登上排行榜。',
    category: 'multiplayer',
    thumbnail: 'https://via.placeholder.com/300x200/45aaf2/ffffff?text=多人对战',
    gameUrl: 'https://example.com/games/multiplayer-battle',
    rating: 4.9,
    plays: 21000,
    tags: ['多人', '对战', '竞技'],
    createdAt: '2023-08-30'
  }
];

// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 游戏API
export const gameApi = {
  // 获取所有游戏
  getAllGames: async () => {
    await delay(500);
    return { data: gamesData };
  },
  
  // 获取单个游戏
  getGame: async (id) => {
    await delay(300);
    const game = gamesData.find(g => g._id === id);
    if (!game) {
      throw new Error('游戏不存在');
    }
    return { data: game };
  },
  
  // 按分类获取游戏
  getGamesByCategory: async (category) => {
    await delay(400);
    const games = category === 'all' 
      ? gamesData 
      : gamesData.filter(g => g.category.toLowerCase() === category.toLowerCase());
    return { data: games };
  },
  
  // 获取热门游戏
  getPopularGames: async (limit = 4) => {
    await delay(300);
    const sortedGames = [...gamesData].sort((a, b) => b.plays - a.plays);
    return { data: sortedGames.slice(0, limit) };
  },
  
  // 获取最新游戏
  getNewGames: async (limit = 4) => {
    await delay(300);
    const sortedGames = [...gamesData].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    return { data: sortedGames.slice(0, limit) };
  },
  
  // 搜索游戏
  searchGames: async (query) => {
    await delay(600);
    const filteredGames = gamesData.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) || 
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase()) ||
      (game.tags && game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
    return { data: filteredGames };
  }
};

// 用户API（模拟）
export const userApi = {
  // 登录
  login: async (credentials) => {
    await delay(800);
    // 模拟登录成功
    return { 
      data: {
        token: 'fake-jwt-token',
        user: {
          id: '1',
          username: credentials.username,
          email: 'user@example.com',
          avatar: 'https://via.placeholder.com/150'
        }
      }
    };
  },
  
  // 注册
  register: async (userData) => {
    await delay(1000);
    // 模拟注册成功
    return { 
      data: {
        token: 'fake-jwt-token',
        user: {
          id: '1',
          username: userData.username,
          email: userData.email,
          avatar: 'https://via.placeholder.com/150'
        }
      }
    };
  },
  
  // 获取用户资料
  getProfile: async () => {
    await delay(500);
    // 模拟获取用户资料
    return { 
      data: {
        id: '1',
        username: '游戏玩家',
        email: 'player@example.com',
        avatar: 'https://via.placeholder.com/150',
        joinDate: '2023-01-15',
        favoriteGames: ['1', '4'],
        recentlyPlayed: ['2', '3', '8']
      }
    };
  }
};
const mongoose = require('mongoose');
const Game = require('../models/Game');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('已连接到MongoDB'))
  .catch(err => console.error('连接MongoDB失败:', err));

// 示例游戏数据
const games = [
  {
    title: '2048',
    description: '一款经典的数字拼图游戏，通过合并相同的数字来获得2048。',
    thumbnail: 'https://via.placeholder.com/300x180?text=2048',
    gameUrl: 'https://play2048.co/',
    category: '益智',
    tags: ['数字', '拼图', '策略'],
    rating: 4.5,
    plays: 1000
  },
  {
    title: '贪吃蛇',
    description: '控制蛇吃食物并不断成长，但要避免撞到墙壁或自己的身体。',
    thumbnail: 'https://via.placeholder.com/300x180?text=Snake',
    gameUrl: 'https://playsnake.org/',
    category: '休闲',
    tags: ['经典', '街机', '休闲'],
    rating: 4.2,
    plays: 1500
  },
  {
    title: '俄罗斯方块',
    description: '经典的俄罗斯方块游戏，通过旋转和移动方块来消除行。',
    thumbnail: 'https://via.placeholder.com/300x180?text=Tetris',
    gameUrl: 'https://tetris.com/play-tetris',
    category: '益智',
    tags: ['经典', '街机', '策略'],
    rating: 4.8,
    plays: 2000
  }
];

// 清空并重新填充游戏集合
const seedGames = async () => {
  try {
    // 清空现有数据
    await Game.deleteMany({});
    console.log('已清空游戏集合');

    // 添加新数据
    const createdGames = await Game.insertMany(games);
    console.log(`已添加 ${createdGames.length} 个游戏`);

    // 关闭数据库连接
    mongoose.connection.close();
  } catch (error) {
    console.error('种子数据错误:', error);
    mongoose.connection.close();
  }
};

// 执行种子函数
seedGames();
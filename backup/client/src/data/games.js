// 游戏数据文件
const gamesData = [
  {
    id: "action-game-1",
    title: "动作游戏 1",
    description: "这是一个精彩的动作游戏",
    instructions: "使用WASD移动，空格跳跃，鼠标点击攻击",
    category: "action",
    imageUrl: "/images/games/action1.jpg",
    gameUrl: "/games/action1.html",
    isFeatured: true,
    isPopular: true,
    isNew: true,
    rating: 4.5,
    plays: 6115
  },
  {
    id: "action-game-2",
    title: "动作游戏 2",
    description: "刺激的动作冒险游戏",
    instructions: "使用方向键移动，Z键攻击，X键防御",
    category: "action",
    imageUrl: "/images/games/action2.jpg",
    gameUrl: "/games/action2.html",
    isFeatured: true,
    isPopular: true,
    isNew: false,
    rating: 4.4,
    plays: 7345
  },
  {
    id: "puzzle-game-1",
    title: "益智游戏 1",
    description: "锻炼大脑的益智游戏",
    instructions: "点击方块移动它们，完成谜题",
    category: "puzzle",
    imageUrl: "/images/games/puzzle1.jpg",
    gameUrl: "/games/puzzle1.html",
    isFeatured: false,
    isPopular: true,
    isNew: true,
    rating: 4.2,
    plays: 5230
  }
];

export default gamesData;
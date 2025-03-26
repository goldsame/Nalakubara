const Game = require('../models/Game');

// 获取所有游戏
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取单个游戏
exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: '游戏未找到' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 创建新游戏
exports.createGame = async (req, res) => {
  const game = new Game(req.body);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 更新游戏
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) {
      return res.status(404).json({ message: '游戏未找到' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 删除游戏
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: '游戏未找到' });
    }
    res.status(200).json({ message: '游戏已删除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 按分类获取游戏
exports.getGamesByCategory = async (req, res) => {
  try {
    const games = await Game.find({ category: req.params.category });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
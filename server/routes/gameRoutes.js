const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// 获取所有游戏
router.get('/', gameController.getGames);

// 按分类获取游戏
router.get('/category/:category', gameController.getGamesByCategory);

// 获取单个游戏
router.get('/:id', gameController.getGame);

// 创建新游戏
router.post('/', gameController.createGame);

// 更新游戏
router.put('/:id', gameController.updateGame);

// 删除游戏
router.delete('/:id', gameController.deleteGame);

module.exports = router;
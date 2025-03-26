const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('已连接到MongoDB'))
  .catch(err => console.error('连接MongoDB失败:', err));

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
  res.send('游戏网站API正在运行');
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
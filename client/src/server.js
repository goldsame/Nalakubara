const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// 尝试使用一个更高的端口号，减少冲突可能性
const PORT = process.env.PORT || 8080;

// 启用gzip压缩
app.use(compression());

// 提供静态文件
app.use(express.static(path.join(__dirname, '../build')));

// 所有请求都返回index.html，让React Router处理客户端路由
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
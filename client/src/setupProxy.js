const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://s.1688.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/service'
      }
    })
  );
};
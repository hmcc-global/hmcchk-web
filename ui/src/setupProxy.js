const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1337',
    })
  );

  // To connect to production backend. DON'T USE THIS IN DEV UNLESS YOU KNOW WHAT YOU'RE DOING
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'https://hongkong.hmcc.net',
  //     changeOrigin: true,
  //   })
  // );
};

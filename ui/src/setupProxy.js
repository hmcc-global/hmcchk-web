const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1337',
    })
  );

  // Site Link redirects are resolved by Sails, not the SPA. Without this, /go/*
  // falls through to the dev server's index.html and renders the error page.
  app.use(
    '/go',
    createProxyMiddleware({
      target: 'http://localhost:1337',
    })
  );

  // To connect to production backend. DON'T USE THIS IN DEV UNLESS YOU KNOW WHAT YOU'RE DOING
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'https://hk.hmccglobal.org',
  //     changeOrigin: true,
  //   })
  // );
};

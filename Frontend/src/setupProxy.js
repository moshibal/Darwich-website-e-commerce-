const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://100.25.211.55/api",
      changeOrigin: true,
    })
  );
};

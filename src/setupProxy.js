const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/base-api/v1", // Specify the endpoint you want to proxy
    createProxyMiddleware({
      target: "http://localhost:8080", // Replace with your Spring Boot server URL
      changeOrigin: true,
    })
  );
};

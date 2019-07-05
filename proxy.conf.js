module.exports = {
  "/api": {
    "target": "http://192.168.1.101:8081",
    "changeOrigin": true,
    "ws": false,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}
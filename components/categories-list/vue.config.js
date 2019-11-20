module.exports = {
  devServer: {
    proxy: {
      '/data': {
        target: 'http://localhost:3010',
        ws: true,
        changeOrigin: true
      }
    }
  }
};

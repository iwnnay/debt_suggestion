const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',

  output: {
    filename: 'credit.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',

        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
    ],
  },
};

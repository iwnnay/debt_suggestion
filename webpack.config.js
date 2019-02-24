const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'awesome-typescript-loader' },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  entry: ['webpack-hot-middleware/client', './src/index.tsx'],
  output: {
    filename: 'calc.js',
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: '/',
  },
  mode: process.env.NODE_ENV || 'development',
  plugins: [new webpack.HotModuleReplacementPlugin(), new WriteFilePlugin()],

  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  devServer: {
    hot: true,
    inline: true,
    compress: true,
    host: '0.0.0.0',
    port: 3100,
  },
};

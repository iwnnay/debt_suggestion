const webpack = require('webpack');
const path = require('path');

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

  entry: ['./src/index.tsx'],
  output: {
    filename: 'calc.js',
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: path.resolve(__dirname, 'public'),
  },
  mode: process.env.NODE_ENV || 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: '0.0.0.0',
    port: 3100,
  },
};

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },

  entry: "./src/index.tsx",
  output: {
    filename: 'calc.js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  mode: process.env.NODE_ENV || 'development',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devtool: "source-map",

  resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
};

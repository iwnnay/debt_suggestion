/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const server = require('./server.js');
const config = require('./webpack.config');

Object.assign(process.env, { HOST: '0.0.0.0', PORT: 3100 });
const compiler = webpack(config);
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(middleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(hotMiddleware(compiler));

server.start(app);

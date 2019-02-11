const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const server = require('./server.js');
const config = require('./webpack.config');

Object.assign(process.env, { HOST: '0.0.0.0', PORT: 3100 });
const compiler = webpack(config);
const app = express();


app.use(middleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

server.start(app);

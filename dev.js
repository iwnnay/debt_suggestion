const server = require('./server.js');

Object.assign(process.env, { HOST: '0.0.0.0', PORT: 3100 });
server.start();

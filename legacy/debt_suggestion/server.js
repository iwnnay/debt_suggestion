const path = require('path');
const express = require('express');

const createDefaultApp = () => express().use(express.static(path.join(__dirname, 'public')));

exports.start = (app = createDefaultApp()) => {
  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || false;

  app.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'));

  if (HOST) {
    app.listen(PORT, HOST, () => console.log(`Listening on ${PORT}`));
  } else {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }
};

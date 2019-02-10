const path = require('path')
const express = require('express')

exports.start = () => {
  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || false;

  const app = express();

  app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))

  if (HOST) {
    app.listen(PORT, HOST, () => console.log(`Listening on ${ PORT }`));
  } else {
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  }
};


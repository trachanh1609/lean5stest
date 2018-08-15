const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const indexRouter = require('./src/server/routes/');

app.use(express.static('./'));
app.use(express.static('dist'));


app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', cors(), indexRouter);


app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
const express = require('express');
const app = express();

const citiesRouter = require('./src/server/routes/cities');

app.use(express.static('./'));
app.use(express.static('dist'));



app.use('/api/cities', citiesRouter);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
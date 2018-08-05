const express = require('express');
const app = express();

const citiesRouter = require('./src/server/routes/cities');
const corpRouter = require('./src/server/routes/corporations');
const corpRoom = require('./src/server/routes/rooms');

app.use(express.static('./'));
app.use(express.static('dist'));



app.use('/api/cities', citiesRouter);
app.use('/api/corporations', corpRouter);
app.use('/api/rooms', corpRoom);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
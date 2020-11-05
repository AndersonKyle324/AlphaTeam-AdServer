//Learning file that is a simple local server using express, practicing setting
//handling different REST html requests.
const express = require('express');
const app = express();
const port = 3000;
const wiki = require('./wiki.js');

app.use('/wiki', wiki);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log('Example app listening on port ${port}!')
});

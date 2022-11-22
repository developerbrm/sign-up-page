const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/html/signup.html`);
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

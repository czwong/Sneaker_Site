const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

const PORT = 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.listen(PORT, () => {
  console.log('server is listening on port', server.address().port);
});

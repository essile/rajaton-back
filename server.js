const express = require('express');
const cors = require('cors');
const Stock = require('./stock/stock');
var AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 5000;

const stock = new Stock();

AWS.config.update({
  region: "eu-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


app.get('/api/hello', (req, res) => {
  res.json({ test: 'Hello' });
});

app.get('/api/stock-products', (req, res) => {
  // res.json(stock.store);
  var params = {
    TableName: "Products"
  };
  docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      data.Items.forEach(function (product) {
        stock.addToStore(product);
      });
    }
    res.json(data.Items);
  }
  // console.log('storessa', stock.store);
  // res.json(stock.store);
});
const express = require('./client/node_modules/express');
const cors = require('./client/node_modules/cors');
const Stock = require('./stock/stock');
const productList = require('./product/productJSON.json');

const app = express();
const port = process.env.PORT || 1234;

const stock = new Stock();

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
  res.json(productList);
});
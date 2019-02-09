const express = require('express');
const app = express();

var cors = require('cors');

const port = process.env.PORT || 5000;

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

app.get('/api/jee', (req, res) => {
  res.json({ test: 'jee' });
});
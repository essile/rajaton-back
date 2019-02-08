const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/hello', (req, res) => {
  res.json({ test: 'Hello' });
});

app.get('/api/jee', (req, res) => {
  res.json({ test: 'jee' });
});
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Inject env vars as window globals — consumed by index.html
app.get('/env.js', (req, res) => {
  const formAction = process.env.FORM_ACTION || '';
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.__FORM_ACTION__ = ${JSON.stringify(formAction)};`);
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`RYVR LeadGen running on port ${PORT}`);
});

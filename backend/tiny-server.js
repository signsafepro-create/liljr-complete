require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10
});

const TOKEN_TTL = 30 * 24 * 60 * 60; // 30 days

app.get('/', (req, res) => {
  res.json({ status: 'Lil.Jr Live', time: new Date() });
});

app.post('/mobile-scan', async (req, res) => {
  const { raw_text } = req.body;
  // Simplified version - just echo back for testing
  res.json({ 
    ai_reply: `Lil.Jr received: ${raw_text.substring(0, 50)}...`,
    copied: true 
  });
});

app.get("/health", (req, res) => res.json({status: "healthy"}));

module.exports = app;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

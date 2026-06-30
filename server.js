
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.post('/predict', async (req, res) => {
  try {
    const { answers } = req.body;
    const response = await axios.post('http://localhost:5001/predict', { answers });
    res.json(response.data);
  } catch (err) {
    console.error('❌ Prediction error:', err.message);
    res.status(500).json({ error: 'Prediction service failed.' });
  }
});

app.listen(5000, () => {
  console.log('✅ Node.js server running on http://localhost:5000');
});
app.get("/", (req, res) => {
  res.send("Server running");
});
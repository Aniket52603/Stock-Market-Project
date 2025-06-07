const https = require('https');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'summery.html'));
});
app.get('/api/market-summary', (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    port: null,
    path: '/market/v2/get-summary?region=US',
    headers: {
      'x-rapidapi-key': 'a96d419b4amshb8aadee2425db02p1bc064jsnbb407b040deb', // Replace with a valid key
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);

        if (!jsonData.marketSummaryAndSparkResponse || !jsonData.marketSummaryAndSparkResponse.result) {
          return res.status(500).json({ error: 'Unexpected API response format' });
        }

        res.json(jsonData.marketSummaryAndSparkResponse.result);
      } catch (error) {
        res.status(500).json({ error: 'Failed to parse API response' });
      }
    });
  });

  apiReq.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });

  apiReq.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

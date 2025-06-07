const https = require('https');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static("public"))
//app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve 'watch.html' as the default file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'watchlist.html'));
});

app.get('/api/stock/:ticker', (req, res) => {
    const stockSymbol = req.params.ticker.toUpperCase();
    
    const options = {
        method: 'GET',
        hostname: 'stock-price-by-api-ninjas.p.rapidapi.com',
        port: null,
        path: `/v1/stockprice?ticker=${stockSymbol}`,
        headers: {
            'x-rapidapi-key': "a96d419b4amshb8aadee2425db02p1bc064jsnbb407b040deb", // Secure API key in .env
            'x-rapidapi-host': 'stock-price-by-api-ninjas.p.rapidapi.com'
        }
    };

    const apiReq = https.request(options, (apiRes) => {
        let chunks = [];

        apiRes.on('data', (chunk) => {
            chunks.push(chunk);
        });

        apiRes.on('end', () => {
            const body = Buffer.concat(chunks);
            try {
                const data = JSON.parse(body.toString());
                if (data.price) {
                    res.json({
                        symbol: stockSymbol,
                        price: data.price
                    });
                } else {
                    res.status(404).json({ error: "Stock not found or data unavailable" });
                }
            } catch (error) {
                res.status(500).json({ error: "Failed to parse stock data" });
            }
        });
    });

    apiReq.on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: "Error fetching stock price" });
    });

    apiReq.end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

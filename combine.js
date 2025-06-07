const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// ✅ API route for autocomplete search
/*app.get('/api/auto-complete', (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const options = {
        method: 'GET',
        hostname: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        port: null,
        path: `/auto-complete?region=US&q=${encodeURIComponent(query)}`,
        headers: {
            'x-rapidapi-key': 'a96d419b4amshb8aadee2425db02p1bc064jsnbb407b040deb',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };





    const reqApi = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                res.status(500).json({ error: 'Failed to parse API response' });
            }
        });
    });

    reqApi.on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    });

    reqApi.end();
});*/

// ✅ API route for fetching stock chart data
app.get('/api/stock-chart/:symbol', (req, res) => {
    const stockSymbol = req.params.symbol.toUpperCase();

    const options = {
        method: 'GET',
        hostname: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        port: null,
        path: `/stock/v3/get-chart?interval=1mo&region=US&symbol=${stockSymbol}&range=5y&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`,
        headers: {
            'x-rapidapi-key': 'a96d419b4amshb8aadee2425db02p1bc064jsnbb407b040deb',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };

    const request = https.request(options, (response) => {
        let chunks = [];

        response.on('data', (chunk) => {
            chunks.push(chunk);
        });

        response.on('end', () => {
            const body = Buffer.concat(chunks).toString();

            try {
                const data = JSON.parse(body);
                if (data.chart && data.chart.result && Array.isArray(data.chart.result) && data.chart.result.length > 0) {
                    const transformedData = {
                        timestamp: data.chart.result[0].timestamp,
                        indicators: {
                            quote: [{ close: data.chart.result[0].indicators.quote[0].close }]
                        }
                    };
                    res.json(transformedData);
                } else {
                    res.status(500).json({ error: "Unexpected data structure from API." });
                }
            } catch (error) {
                console.error('Parsing error:', error);
                res.status(500).json({ error: "Error parsing data from API." });
            }
        });
    });

    request.on('error', (error) => {
        console.error('Request error:', error);
        res.status(500).json({ error: "Request error." });
    });

    request.end();

    
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



// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});


 



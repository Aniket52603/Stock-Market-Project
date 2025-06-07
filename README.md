# Stock-Market-Project
A Node.js-based stock market dashboard that uses Express.js and integrates Yahoo Finance &amp; API Ninjas APIs to fetch real-time prices, market summaries, and historical chart data. Features include a watchlist, data visualization with Chart.js, and static frontend pages served via Express.

# 📈 Stock Market Dashboard & Watchlist

A full-stack Node.js application that allows users to view real-time stock prices, analyze historical chart data, and manage a personalized stock watchlist. It uses Express.js and integrates with Yahoo Finance and API Ninjas to fetch financial data.

---

## 🚀 Features

- ✅ Real-time stock price updates (API Ninjas)
- 📊 5-year historical stock chart data (Yahoo Finance)
- ⭐ Manage a custom watchlist
- 📈 Market summary of major U.S. indices
- 🌐 Static frontend pages (served via Express)
- 📦 Modular backend structure using Express.js

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **APIs:** Yahoo Finance, API Ninjas
- **Frontend:** HTML, CSS, JavaScript
- **Visualization:** Chart.js
- **Others:** CORS, dotenv, HTTPS

---

## 📁 Project Structure


├── combine.js # Main backend server (charts & price)
├── summery.js # Market summary route
├── watchlist.js # Watchlist feature
├── package.json # Dependencies
├── public/ # Frontend HTML/CSS/JS


---

## 🔑 Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Add a `.env` file (if securing API keys).
4. Run:
   - `node combine.js` for chart and price data
   - `node summery.js` for market summaries
   - `node watchlist.js` for watchlist interface

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 📌 Future Scope

- Implement autocomplete stock search
- Add user login and persistent data storage
- Use WebSocket for live price updates
- Deploy on cloud (e.g., Vercel, Render, Railway)

---

## 👤 Author

**Aniket Chandan**

---

## 📄 License

This project is licensed under the ISC License.


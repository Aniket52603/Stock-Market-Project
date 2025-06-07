async function fetchStock(symbol) {
    try {
        const response = await fetch(`/stock-price?symbol=${symbol}`);
        const data = await response.json();

        if (data.error) {
            alert("Stock not found!");
            return;
        }

        return {
            name: symbol.toUpperCase(),
            price: data.price,
            change: data.changePercent
        };

    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}

async function addStock() {
    const stockSymbol = document.getElementById("stockSymbol").value.trim().toUpperCase();
    if (!stockSymbol) return alert("Enter a stock symbol!");

    const stockData = await fetchStock(stockSymbol);
    if (!stockData) return;

    const table = document.getElementById("watchlist");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${stockData.name}</td>
        <td>${stockData.price}</td>
        <td>${stockData.change}%</td>
    `;

    table.appendChild(row);
}

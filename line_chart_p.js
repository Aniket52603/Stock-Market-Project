let chartInstance = null; // Reference to the current chart instance

// Function to update the chart heading
function updateHeading(symbol) {
    const heading = document.getElementById("chart-heading");
    if (!heading) {
        console.error("Heading element not found!");
        return;
    }

    const stockNames = {
        "TSLA": "TSLA - Tesla Inc.",
        "GOOGL": "GOOGL - Alphabet Inc.",
        "AAPL": "AAPL - Apple Inc."
    };

    heading.textContent = stockNames[symbol] || "Stock Chart";
}

// Function to fetch stock data from the server
async function fetchStockData(symbol) {
    try {
        console.log(`🔄 Fetching data for: ${symbol}`); // Debugging log

        const response = await fetch(`/api/stock-chart/${symbol}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ API Response:", data); // Debugging log

        if (data?.timestamp?.length && data?.indicators?.quote?.length) {
            const timestamps = data.timestamp.map(ts => new Date(ts * 1000)); // Convert to JS Date format
            const stockPrices = data.indicators.quote[0].close;
            
            updateHeading(symbol); // Update the heading
            updateChart(timestamps, stockPrices, symbol);
        } else {
            console.error("⚠️ Unexpected data structure:", data);
        }
    } catch (error) {
        console.error("❌ Error fetching stock data:", error);
    }
}

// Function to update the chart
function updateChart(timestamps, stockPrices, symbol) {
    const canvas = document.getElementById("myChart");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null; // Clear reference
    }

    // Create a gradient background
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.8)");  // Solid green at the top
    gradient.addColorStop(0.7, "rgba(34, 197, 94, 0.3)"); // Lighter green in the middle
    gradient.addColorStop(1, "rgba(34, 197, 94, 0)"); // Transparent at bottom

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: timestamps,
            datasets: [{
                label: `${symbol} Stock Price`,
                data: stockPrices,
                borderColor: "rgb(34, 197, 94)",  // Line color
                backgroundColor: gradient,  // Gradient fill
                fill: true,  // Enables the fill effect
                tension: 0.2  // Smooth curve
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "hour"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Price (USD)"
                    }
                }
            }
        }
    });
}

// ✅ Ensure event listeners are added only once
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded, setting up event listeners...");

    // Ensure buttons exist before adding event listeners
    let tslaBtn = document.getElementById("TSLA-btn");
    let googlBtn = document.getElementById("GOOGL-btn");
    let aaplBtn = document.getElementById("AAPL-btn");

    if (!tslaBtn || !googlBtn || !aaplBtn) {
        console.error("⚠️ One or more button elements not found!");
        return;
    }

    tslaBtn.addEventListener("click", () => fetchStockData("TSLA"), { once: true });
    googlBtn.addEventListener("click", () => fetchStockData("GOOGL"), { once: true });
    aaplBtn.addEventListener("click", () => fetchStockData("AAPL"), { once: true });

    // ✅ Fetch and display the default stock (Apple) chart ONCE
    setTimeout(() => fetchStockData("AAPL"), 0); // Small delay to ensure DOM is ready
});

document.addEventListener("DOMContentLoaded", function() {
    // Function to draw pie chart
    function drawPieChart(chartData, targetElement) {
        new Chart(targetElement, {
            type: 'pie',
            data: {
                labels: ['Amount Paid', 'Amount Left', 'Interest Paid', 'Interest Left'],
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0'],
                    hoverBackgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Function to display EMI cards and draw pie chart
    function displayEMICards(data) {
        const emiOrders = data.filter(order => order['Payment Method'] === 'EMI');
        if (emiOrders.length === 0) {
            document.getElementById('emiCards').innerHTML = '<p>No EMI orders found.</p>';
            return;
        }

        document.getElementById('emiCards').innerHTML = emiOrders.map(order => {
            const chartData = [
                parseFloat(order['Amount Paid']),
                parseFloat(order['Amount Left']),
                parseFloat(order['Interest Paid']),
                parseFloat(order['Interest Left'])
            ];
            const cardHtml = `
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Order ID: ${order['Order ID']}
                        </div>
                        <div class="card-body">
                            <div>
                                <img src="${order['Image Link']}">
                            </div>
                            <div>
                                <h3>${order['Product Name']}</h3>
                                <p><b>Price:</b> ₹${order['Price for Customer']}</p>
                                <p><b>Order Date:</b> ${order['Order Date']}</p>
                                <p><b>EMI Duration:</b> ${parseInt(order['Duration'])} months</p>
                                <p><b>Next Month Pay:</b> ₹${order['Monthly Payment']}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="card-body-2">
                            <div class="chart-container">
                                    <canvas id="emiPieChart${order['Order ID']}"></canvas>
                            </div>
                            
                            <div class="con">
                            <span><b>Amount Paid:</b> ₹${order['Amount Paid']}</span><br>
                            <span><b>Amount Left:</b> ₹${order['Amount Left']}</span><br><br>
                            <span><b>Interest Paid:</b> ₹${order['Interest Paid']}</span><br>
                            <span><b>Interest Left:</b> ₹${order['Interest Left']}</span><br><br>
                            <button class="btn btn-primary">Pay Now</button>
                            <button class="btn btn-primary">Change Duration</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => { // Delay to ensure DOM is updated before drawing chart
                drawPieChart(chartData, `emiPieChart${order['Order ID']}`);
            }, 0);
            return cardHtml;
        }).join('');
    }

    // Function to display Amazon Pay Later cards and draw pie chart
    function displayAPLCards(data) {
        const aplOrders = data.filter(order => order['Payment Method'] === 'Amazon Pay Later');
        if (aplOrders.length === 0) {
            document.getElementById('aplCards').innerHTML = '<p>No Amazon Pay Later orders found.</p>';
            return;
        }

        document.getElementById('aplCards').innerHTML = aplOrders.map(order => {
            const chartData = [
                parseFloat(order['Amount Paid']),
                parseFloat(order['Amount Left']),
                parseFloat(order['Interest Paid']),
                parseFloat(order['Interest Left'])
            ];
            const cardHtml = `
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Order ID: ${order['Order ID']}
                        </div>
                        <div class="card-body">
                            <div>
                                <img src="${order['Image Link']}">
                            </div>
                            <div>
                                <h3>${order['Product Name']}</h3>
                                <p><b>Price:</b> ₹${order['Price for Customer']}</p>
                                <p><b>Order Date:</b> ${order['Order Date']}</p>
                                <p><b>EMI Duration:</b> ${parseInt(order['Duration'])} months</p>
                                <p><b>Next Month Pay:</b> ₹${order['Monthly Payment']}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="card-body-2">
                            <div class="chart-container">
                                    <canvas id="aplPieChart${order['Order ID']}"></canvas>
                            </div>
                            
                            <div class="con">
                            <span><b>Amount Paid:</b> ₹${order['Amount Paid']}</span><br>
                            <span><b>Amount Left:</b> ₹${order['Amount Left']}</span><br><br>
                            <span><b>Interest Paid:</b> ₹${order['Interest Paid']}</span><br>
                            <span><b>Interest Left:</b> ₹${order['Interest Left']}</span><br><br>
                            <button class="btn btn-primary">Pay Now</button>
                            <button class="btn btn-primary">Change Duration</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => { // Delay to ensure DOM is updated before drawing chart
                drawPieChart(chartData, `aplPieChart${order['Order ID']}`);
            }, 0);
            return cardHtml;
        }).join('');
    }

    // Function to fetch CSV data and initialize
    function fetchDataAndInitialize() {
        d3.csv("customer_orders.csv").then(function(data) {
            displayEMICards(data);
            setupEventListeners(data);
        }).catch(function(error) {
            console.error("Error loading the CSV file:", error);
        });
    }

    // Function to set up event listeners
    function setupEventListeners(data) {
        document.getElementById('emiButton').addEventListener('click', function() {
            document.getElementById('emiSection').classList.remove('d-none');
            document.getElementById('aplSection').classList.add('d-none');
            displayEMICards(data);
        });

        document.getElementById('aplButton').addEventListener('click', function() {
            document.getElementById('emiSection').classList.add('d-none');
            document.getElementById('aplSection').classList.remove('d-none');
            displayAPLCards(data);
        });
    }

    // Initialize on page load
    fetchDataAndInitialize();
});

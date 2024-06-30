d3.csv('customer_orders.csv').then(function(data) {
    // Parse the CSV data
    data.forEach(d => {
        d['Order Date'] = new Date(d['Order Date']);
        d['Order Year'] = d['Order Date'].getFullYear();
        d['Order Month'] = d3.timeFormat('%Y-%m')(d['Order Date']);
        d['Price for Customer'] = +d['Price for Customer'];
        d['Savings'] = +d['Savings'];
    });

    // Populate year and month filters
    let years = [...new Set(data.map(d => d['Order Year']))].sort();
    let months = [...new Set(data.map(d => d['Order Month'].split('-')[1]))].sort();

    let yearFilter = d3.select("#yearFilter");
    let monthFilter = d3.select("#monthFilter");

    years.forEach(year => {
        yearFilter.append("option").attr("value", year).text(year);
    });

    months.forEach(month => {
        monthFilter.append("option").attr("value", month).text(d3.timeFormat('%B')(new Date(2020, month - 1)));
    });

    function updatePlots() {
        let selectedYear = yearFilter.property("value");
        let selectedMonth = monthFilter.property("value");

        let filteredData = data.filter(d => (selectedYear === 'all' || d['Order Year'] == selectedYear) && (selectedMonth === 'all' || d3.timeFormat('%m')(d['Order Date']) == selectedMonth));

        // Group by category for spending and savings
        let categoryData = d3.nest()
            .key(d => d['Product Category'])
            .rollup(v => {
                return {
                    totalSpending: d3.sum(v, d => d['Price for Customer']),
                    totalSavings: d3.sum(v, d => d['Savings'])
                };
            })
            .entries(filteredData)
            .sort((a, b) => b.value.totalSpending - a.value.totalSpending);

        // Group by month for spending and savings
        let monthlyData = d3.nest()
            .key(d => d['Order Month'])
            .rollup(v => {
                return {
                    totalSpending: d3.sum(v, d => d['Price for Customer']),
                    totalSavings: d3.sum(v, d => d['Savings'])
                };
            })
            .entries(filteredData)
            .sort((a, b) => new Date(a.key) - new Date(b.key));

        // Prepare data for category comparison
        let categoryLabels = categoryData.map(d => d.key);
        let categorySpending = categoryData.map(d => d.value.totalSpending);
        let categorySavings = categoryData.map(d => d.value.totalSavings);

        // Plot spending and savings by category
        let categorySpendingTrace = {
            x: categorySpending,
            y: categoryLabels,
            name: 'Spending',
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgba(50, 171, 96, 1)'
            }
        };

        let categorySavingsTrace = {
            x: categorySavings,
            y: categoryLabels,
            name: 'Savings',
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgba(219, 64, 82, 1)'
            }
        };

        let categoryLayout = {
            title: 'Spending and Savings by Category',
            barmode: 'group',
            xaxis: { title: 'Amount (₹)' },
            yaxis: { title: 'Category', automargin: true },
            margin: { l: 150, r: 20, t: 50, b: 50 }
        };

        Plotly.newPlot('category-comparison', [categorySpendingTrace, categorySavingsTrace], categoryLayout);

        // Prepare data for monthly comparison
        let monthLabels = monthlyData.map(d => d.key);
        let monthlySpending = monthlyData.map(d => d.value.totalSpending);
        let monthlySavings = monthlyData.map(d => d.value.totalSavings);

        // Plot spending and savings by month
        let monthlySpendingTrace = {
            x: monthlySpending,
            y: monthLabels,
            name: 'Spending',
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgba(50, 171, 96, 1)'
            }
        };

        let monthlySavingsTrace = {
            x: monthlySavings,
            y: monthLabels,
            name: 'Savings',
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgba(219, 64, 82, 1)'
            }
        };

        let monthlyLayout = {
            title: 'Spending and Savings by Month',
            barmode: 'group',
            xaxis: { title: 'Amount (₹)' },
            yaxis: { title: 'Month', automargin: true },
            margin: { l: 150, r: 20, t: 50, b: 50 }
        };

        Plotly.newPlot('monthly-comparison', [monthlySpendingTrace, monthlySavingsTrace], monthlyLayout);
    }

    yearFilter.on("change", updatePlots);
    monthFilter.on("change", updatePlots);

    updatePlots();
});

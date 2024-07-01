document.addEventListener('DOMContentLoaded', function () {
    const monthlyBudgetInput = document.getElementById('monthlyBudget');
    const yearlyBudgetInput = document.getElementById('yearlyBudget');
    const applyFiltersButton = document.getElementById('applyFilters');
    const monthlySpendingsBtn = document.getElementById('monthlySpendingsBtn');
    const yearlySpendingsBtn = document.getElementById('yearlySpendingsBtn');
    const chartTitle = document.getElementById('chartTitle');
    const ctx = document.getElementById('spendingsChart').getContext('2d');
    let spendingsChart;

    function number_format(number) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
    }

    function createChart(labels, data, budgetLimit, title) {
        if (spendingsChart) {
            spendingsChart.destroy();
        }

        spendingsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data.map(d => d.amount),
                    backgroundColor: data.map(d => d.amount > budgetLimit ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'),
                    borderColor: data.map(d => d.amount > budgetLimit ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        }
                    }
                },
                plugins: {
                    annotation: {
                        annotations: {
                            budgetLine: {
                                type: 'line',
                                yMin: budgetLimit,
                                yMax: budgetLimit,
                                borderColor: 'red',
                                borderWidth: 2,
                                label: {
                                    content: 'Budget Limit',
                                    enabled: true,
                                    position: 'end'
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    function updateChart(filterType) {
        const monthlyBudget = parseFloat(monthlyBudgetInput.value);
        const yearlyBudget = parseFloat(yearlyBudgetInput.value);

        d3.csv('static/customer_orders.csv').then(data => {
            data.forEach(d => {
                d['Price for Customer'] = +d['Price for Customer'];
                const date = new Date(d['Order Date']);
                if (!isNaN(date)) {
                    d['Order Year'] = date.getFullYear(); // Correctly parse the year
                    d['Order Month'] = date.getMonth() + 1; // Correctly parse the month
                }
            });

            if (filterType === 'monthly') {
                const monthlySpendings = d3.rollups(
                    data,
                    v => d3.sum(v, d => d['Price for Customer']),
                    d => d['Order Month']
                ).map(([key, value]) => ({ month: key, amount: value })).filter(d => !isNaN(d.month));

                // Map month numbers to month names
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                monthlySpendings.forEach(d => {
                    d.monthName = monthNames[parseInt(d.month) - 1];
                });

                // Sort by month number
                monthlySpendings.sort((a, b) => parseInt(a.month) - parseInt(b.month));

                const labels = monthlySpendings.map(d => d.monthName);

                chartTitle.textContent = 'Monthly Spendings';
                createChart(labels, monthlySpendings, monthlyBudget, 'Monthly Spendings');
            } else if (filterType === 'yearly') {
                const yearlySpendings = d3.rollups(
                    data,
                    v => d3.sum(v, d => d['Price for Customer']),
                    d => d['Order Year']
                ).map(([key, value]) => ({ year: key, amount: value })).filter(d => !isNaN(d.year));

                yearlySpendings.sort((a, b) => a.year - b.year);

                const labels = yearlySpendings.map(d => d.year);

                chartTitle.textContent = 'Yearly Spendings';
                createChart(labels, yearlySpendings, yearlyBudget, 'Yearly Spendings');
            }
        });
    }

    applyFiltersButton.addEventListener('click', function () {
        const filterType = chartTitle.textContent.includes('Monthly') ? 'monthly' : 'yearly';
        updateChart(filterType);
    });

    monthlySpendingsBtn.addEventListener('click', function () {
        updateChart('monthly');
    });

    yearlySpendingsBtn.addEventListener('click', function () {
        updateChart('yearly');
    });

    // Initial load
    updateChart('monthly');
});

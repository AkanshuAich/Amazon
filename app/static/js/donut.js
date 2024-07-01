document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('donutChart').getContext('2d');
    const legendContainer = document.getElementById('legendContainer');

    function number_format(number) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2}).format(number);
    }

    function createDonutChart(data) {
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.paymentMethod),
                datasets: [{
                    label: 'Total Spending',
                    data: data.map(d => d.totalSpending),
                    backgroundColor: [
                        '#36a2eb', '#ff6384', '#ffce56', '#4bc0c0', 
                        '#9966ff', '#ff9f40', '#AB784E', '#76d275', '#EBC7B2'
                    ],
                    hoverBackgroundColor: [
                        '#36a2eb', '#ff6384', '#ffce56', '#4bc0c0', 
                        '#9966ff', '#ff9f40', '#AB784E', '#76d275', '#EBC7B2'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        displayx: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                // value = number_format(value).toString();
                                return label+': ₹'+number_format(value);
                            }
                        }
                    }
                }
            }
        });

        // Create custom legends
        legendContainer.innerHTML = chart.data.labels.map((label, index) => {
            const bgColor = chart.data.datasets[0].backgroundColor[index];
            return `
                <div class="legend-item">
                    <span class="legend-color" style="background-color: ${bgColor};"></span>
                    <span>${label}</span>
                </div>
            `;
        }).join('');
    }

    d3.csv('static/customer_orders.csv').then(data => {
        const paymentMethodSpending = d3.rollups(
            data,
            v => d3.sum(v, d => +d['Price for Customer']),
            d => d['Payment Method']
        ).map(([key, value]) => ({ paymentMethod: key, totalSpending: value }));

        createDonutChart(paymentMethodSpending);
    }).catch(error => {
        console.error('Error loading the CSV file:', error);
    });
});
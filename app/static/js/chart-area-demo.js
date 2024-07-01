Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

let count = 0; // Variable to track initial call

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

document.addEventListener('DOMContentLoaded', function () {
  // Selecting elements
  const applyFiltersButton = document.getElementById('applyFilters');
  const yearFilterSelect = document.getElementById('yearFilter');
  const monthFilterSelect = document.getElementById('monthFilter');

  // Adding event listener to applyFiltersButton
  applyFiltersButton.addEventListener('click', function () {
    const selectedYear = yearFilterSelect.value;
    const selectedMonth = monthFilterSelect.value;
    // count = 0;
    // Call updateChart function with selected filters
    updateChart('myAreaChart', selectedYear, selectedMonth, 0);
  });
  updateChart('myAreaChart', 'all', 'all', 0);
});

// Function to update the chart
function updateChart(chartId, selectedYear, selectedMonth, t) {
  // Load CSV data using D3
  d3.csv('static/customer_orders.csv').then(function(data) {
    // Parse the CSV data
    data.forEach(d => {
      d['Price for Customer'] = +d['Price for Customer'];
      d['Savings'] = +d['Savings'];
      d['Order Year'] = d['Order Date'].split('-')[0]; // Extract year from Order Date
      d['Order Month'] = d['Order Date'].split('-')[1]; // Extract month from Order Date
    });

    // Filter data based on selectedYear and selectedMonth
    let filteredData;
    if (selectedYear === 'all' && selectedMonth === 'all') {
      // Show all data
      filteredData = data;
    } else if (selectedYear === 'all') {
      // Filter by selectedMonth only
      filteredData = data.filter(d => d['Order Month'] === selectedMonth);
    } else if (selectedMonth === 'all') {
      // Filter by selectedYear only
      filteredData = data.filter(d => d['Order Year'] === selectedYear);
    } else {
      // Filter by both selectedYear and selectedMonth
      filteredData = data.filter(d => d['Order Year'] === selectedYear && d['Order Month'] === selectedMonth);
    }

    // Group by category for spending and savings using d3.group on filteredData
    const groupedData = d3.group(filteredData, d => d['Product Category']);

    // Prepare arrays for labels and data
    const categoryLabels = Array.from(groupedData.keys());
    const categorySpending = categoryLabels.map(category => {
      return d3.sum(groupedData.get(category), d => d['Price for Customer']);
    });
    const categorySavings = categoryLabels.map(category => {
      return d3.sum(groupedData.get(category), d => d['Savings']);
    });

    // Get existing chart instance or create new one
    let ctx = document.getElementById(chartId);
    let myBarChart;

    // Check if chart instance already exists
    if (t === 0) {
      // First time, create new chart
      myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryLabels,
          datasets: [{
            label: "Spending",
            backgroundColor: "rgba(255, 159, 64, 0.8)", // Orange
            hoverBackgroundColor: "rgba(255, 159, 64, 1)",
            data: categorySpending,
            barPercentage: 0.8, // Adjust to control the width of the bars
            categoryPercentage: 0.7 // Adjust to control the spacing between the groups
          }, {
            label: "Savings",
            backgroundColor: "rgba(35, 47, 61, 0.7)", // Navy Blue
            hoverBackgroundColor: "rgba(35, 47, 61, 1)",
            data: categorySavings,
            barPercentage: 0.8, // Adjust to control the width of the bars
            categoryPercentage: 0.7 // Adjust to control the spacing between the groups
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              stacked: false,
              ticks: {
                maxTicksLimit: 10
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }],
            yAxes: [{
              stacked: false,
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a currency sign in the ticks
                callback: function(value, index, values) {
                  return '₹' + number_format(value);
                }
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              fontFamily: 'Nunito'
            }
          },
          tooltips: {
            mode: 'index',
            intersect: true,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
            callbacks: {
              label: function(tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ₹' + number_format(tooltipItem.yLabel);
              }
            }
          }
        }
      });
    } 
    // else {
    //   // Update existing chart
    //   myBarChart.data.labels = categoryLabels;
    //   myBarChart.data.datasets[0].data = categorySpending;
    //   myBarChart.data.datasets[1].data = categorySavings;
    //   myBarChart.update();
    // }

    count=1; // Increment count after initial creation/update
  });
}

// Call updateChart initially with 'all' filters


Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

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
  const applyFiltersButton = document.getElementById('applyFilters-1');
  const yearFilterSelect = document.getElementById('yearFilter-1');

  // Adding event listener to applyFiltersButton
  applyFiltersButton.addEventListener('click', function () {
    const selectedYear = yearFilterSelect.value;
    // Call updateChart function with selected filters
    updateChartbar("myBarChart", selectedYear);
  });
  updateChartbar("myBarChart", 'all');
});

// Function to update the chart
function updateChartbar(chartId, selectedYear) {
  // Load CSV data using D3
  d3.csv('static/customer_orders.csv').then(function(data) {
    // Parse the CSV data
    data.forEach(d => {
      d['Price for Customer'] = +d['Price for Customer'];
      d['Order Year'] = d['Order Date'].split('-')[0]; // Extract year from Order Date
      d['Order Month'] = d['Order Date'].split('-')[1]; // Extract month from Order Date
    });

    // Filter data based on selectedYear
    let filteredData;
    if (selectedYear === 'all') {
      // Show all data
      filteredData = data;
    } else {
      // Filter by selectedYear
      filteredData = data.filter(d => d['Order Year'] === selectedYear);
    }

    // Group by month for spending using d3.group on filteredData
    const groupedData = d3.group(filteredData, d => d['Order Month']);

    // Prepare arrays for labels (months) and data (monthly spending)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const monthLabels = monthNumbers.map(monthNum => monthNames[+monthNum - 1]);
    const monthlySpending = monthNumbers.map(monthNum => {
      const monthData = groupedData.get(monthNum) || [];
      return d3.sum(monthData, d => d['Price for Customer']);
    });

    // Get existing chart instance or create new one
    let ctx = document.getElementById(chartId);
    let myLineChart;

    // First time, create new chart
    myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
          label: "Monthly Spending",
          borderColor: "rgba(35, 47, 61, 1)",
          backgroundColor: "rgba(255, 159, 64, 0.3)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(35, 47, 61, 1)",
          pointBorderColor: "rgba(35, 47, 61, 1)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(35, 47, 61, 1)",
          pointHoverBorderColor: "rgba(35, 47, 61, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: monthlySpending,
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
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 12 // Adjust based on number of months
            }
          }],
          yAxes: [{
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
          intersect: false,
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

  });
}

// Call updateChart initially with 'all' filters


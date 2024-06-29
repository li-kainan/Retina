document.addEventListener('DOMContentLoaded', () => {
    const number_input = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var value_in = 1
    var CSV_data
    var chart_data
    var chart_config

    const fetchCSV = () => {
        fileName_path = ['csv/', value_in.toString(), '.csv']
        var fileName = fileName_path.join('');
        console.log(fileName)
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        CSV_data = results
                        console.log(CSV_data)
                    }
                });
            });
    };

    const get_chart_data = () => {
        chart_data = {labels: [], datasets: []};
        
        for (let i = 0; i < CSV_data.data.length; i++) {
            chart_data.labels.push(CSV_data.data[i]['x'])

            for (let j = 1; j < 11; j++) {
                var label = 'L' + j.toString()
                if (i == 0) {
                    chart_data.datasets.push(
                        {
                            label: label,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            data: []
                        }
                    )
                }
                chart_data.datasets[j-1].data.push(CSV_data.data[i][label])
            }
        }

        console.log(chart_data)
    }

    const get_chart_config = () => {
        chart_config = {
            type: 'line',
            data: chart_data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'x'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'y'
                        }
                    }
                }
            }
        };
    }

    const updateChart = () => {
        const chart = document.getElementById('chart').getContext('2d');
        const lineChart = new Chart(chart, chart_config);
    }
    
    const update = () => {
        value_in = parseInt(number_input.value)
        fetchCSV();
        get_chart_data();
        get_chart_config();
        updateChart();
    }
        
    ShowButton.addEventListener('click', () => {
        update()
    });
    
    LastButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) - 1;
        new_value = Math.max(new_value, 1)
        number_input.value = new_value
        update()
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) + 1;
        new_value = Math.min(new_value, 84)
        number_input.value = new_value
        update()
    });

    // Initial fetch
    update()
});

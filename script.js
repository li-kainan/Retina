document.addEventListener('DOMContentLoaded', () => {
    const NumberInput = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var ValueIn = 1
    var CSVData
    var ChartData
    var ChartConfig

    const fetchCSV = (ValueIn) => {
        fileName_path = ['csv/', ValueIn.toString(), '.csv']
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

    const get_ChartData = () => {
        ChartData = {labels: [], datasets: []};
        
        for (let i = 0; i < CSVData.data.length; i++) {
            ChartData.labels.push(CSVData.data[i]['x'])

            for (let j = 1; j < 11; j++) {
                var label = 'L' + j.toString()
                if (i == 0) {
                    ChartData.datasets.push(
                        {
                            label: label,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            pointRadius: 0,
                            pointHoverRadius: 0,
                            data: []
                        }
                    )
                }
                ChartData.datasets[j-1].data.push(CSVData.data[i][label])
            }
        }

        console.log(ChartData)
    }

    const get_ChartConfig = () => {
        ChartConfig = {
            type: 'line',
            data: ChartData,
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
        const lineChart = new Chart(chart, ChartConfig);
    }
    
    const update = () => {
        const NumberInput = document.getElementById('number-input');
        ValueIn = parseInt(NumberInput.value)
        fetchCSV(ValueIn);
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
        NumberInput.value = new_value
        update()
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) + 1;
        new_value = Math.min(new_value, 84)
        NumberInput.value = new_value
        update()
    });

    // Initial fetch
    update()
});

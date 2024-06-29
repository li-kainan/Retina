document.addEventListener('DOMContentLoaded', () => {
    const NumberInput = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var ValueIn = 1
    var CSVData
    var ChartData
    var ChartConfig
    var LineChart
    
    const fetch_CSV = (ValueIn) => {
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
                        CSVData = results
                        update(CSVData)
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
                ChartData.datasets[j-1].data.push(664 - CSVData.data[i][label])
            }
        }
    }

    const get_ChartConfig = () => {
        ChartConfig = {
            type: 'line',
            data: ChartData,
            options: {
                responsive: false,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'x'
                        },
                        min: 0,
                        max: 913
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'y'
                        },
                        min: 0,
                        max: 664
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: false
                    }
                },
                animation: false
            },
            plugins: [{
                beforeDraw: (chart) => {
                    if (backgroundImage.complete) {
                        const ctx = chart.ctx;
                        const {top, left, width, height} = chart.chartArea;
                        const x = left + width / 2 - image.width / 2;
                        const y = top + height / 2 - image.height / 2;
                        ctx.drawImage(backgroundImage, x, y);
                    } else {
                        backgroundImage.onload = () => chart.draw();
                    }
                }
            }]
        };
    }

    const update_Chart = () => {
        if (LineChart) {
            LineChart.destroy();
            LineChart = null;
        }
        const chart = document.getElementById('chart').getContext('2d');
        LineChart = new Chart(chart, ChartConfig);
    }
    
    const update = (CSVData) => {
        const backgroundImage = new Image();
        image_path = ['image/', ValueIn.toString(), '.tif']
        backgroundImage.src = image_path.join('');
        
        console.log(CSVData)
        get_ChartData();
        console.log(ChartData)
        get_ChartConfig();
        console.log(ChartConfig)
        //update_Chart();
        backgroundImage.onload = update_Chart;
    }
    
        
    ShowButton.addEventListener('click', () => {
        ValueIn = parseInt(NumberInput.value)
        fetch_CSV(ValueIn)
    });
    
    LastButton.addEventListener('click', () => {
        new_value = parseInt(NumberInput.value) - 1;
        new_value = Math.max(new_value, 1)
        NumberInput.value = new_value
        fetch_CSV(new_value)
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(NumberInput.value) + 1;
        new_value = Math.min(new_value, 84)
        NumberInput.value = new_value
        fetch_CSV(new_value)
    });

    // Initial fetch
    fetch_CSV(ValueIn)
});

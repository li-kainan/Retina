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
    
    const fetch_CSV = () => {
        ValueIn = parseInt(NumberInput.value)
        FileName_path = ['csv/', ValueIn.toString(), '.csv']
        var FileName = FileName_path.join('');
        console.log(FileName)
        
        fetch(FileName)
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        CSVData = results
                        update()
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
    }

    const get_ChartConfig = () => {
        ValueIn = parseInt(NumberInput.value)
        image_path = ['image/', ValueIn.toString(), '.png']
        var ImageName = image_path.join('');
        var img = new Image();
        img.src = ImageName;
        
        ChartConfig = {
            type: 'line',
            data: ChartData,
            options: {
                responsive: false,
                scales: {
                    x: {
                        display: false,
                        title: {
                            display: true,
                            text: 'x'
                        },
                        min: 0,
                        max: 913
                    },
                    y: {
                        display: false,
                        reverse: true,
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
                    },
                    annotation: {
                        annotations: {
                            imageAnnotation: {
                                type: 'label',
                                content: img,
                                xValue: 914/2,
                                yValue: 664/2,
                                width: 914,
                                height: 664,
                                borderColor: 'rgb(0, 255, 0)',
                                borderWidth: 0
                            }
                        }
                    },
                },
                animation: false
            },
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

    const drawImage = () => {
        ValueIn = parseInt(NumberInput.value)
        image_path = ['image/', ValueIn.toString(), '.png']
        var ImageName = image_path.join('');
        console.log(ImageName)

        const Canvas = document.getElementById('chart')
        const Chart = Canvas.getContext('2d');
        const RetinaImage = new Image();
        RetinaImage.src = ImageName;
        
        RetinaImage.onload = () => {
            // Draw the image onto the imageCanvas
            Chart.drawImage(RetinaImage, 0, 0, Canvas.width, Canvas.height);
            drawLines();
        };
    }
    const update = () => {
        /*
        console.log(CSVData)
        get_ChartData();
        console.log(ChartData)
        get_ChartConfig();
        console.log(ChartConfig)
        update_Chart();
        */
        drawImage()
    }
    
        
    ShowButton.addEventListener('click', () => {
        fetch_CSV()
    });
    
    LastButton.addEventListener('click', () => {
        new_value = parseInt(NumberInput.value) - 1;
        new_value = Math.max(new_value, 1)
        NumberInput.value = new_value
        fetch_CSV()
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(NumberInput.value) + 1;
        new_value = Math.min(new_value, 84)
        NumberInput.value = new_value
        fetch_CSV()
    });

    // Initial fetch
    fetch_CSV()

    function drawLines() {
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.lineTo(200,200);
        ctx.closePath();
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    
});

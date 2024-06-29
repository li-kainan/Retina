document.addEventListener('DOMContentLoaded', () => {
    const number_input = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var CSV_data

    const fetchCSV = (value_in) => {
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
                    }
                });
            });
    };

    const updateScatterPlot = (csvData) => {
        
    }
        
    ShowButton.addEventListener('click', () => {
        value_in = parseInt(number_input.value)
        fetchCSV(value_in);
    });
    
    LastButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) - 1;
        new_value = Math.max(new_value, 1)
        number_input.value = new_value
        fetchCSV(new_value);
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) + 1;
        new_value = Math.min(new_value, 84)
        number_input.value = new_value
        fetchCSV(new_value);
    });

    // Initial fetch
    fetchCSV(parseInt(number_input.value));

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: 'Dataset 2',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    };

    const lineChart = new Chart(ctx, config);
    
});

document.addEventListener('DOMContentLoaded', () => {
    const number_input = document.getElementById('number-input');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');

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
                        console.log(results);
                    }
                });
            });
    };

    LastButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) - 1;
        new_value = max(new_value, 1)
        number_input.value = new_value
        fetchCSV(new_value);
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) + 1;
        new_value = min(new_value, 84)
        number_input.value = new_value
        fetchCSV(new_value);
    });

    // Initial fetch
    fetchCSV(1);
});

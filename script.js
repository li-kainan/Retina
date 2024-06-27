document.addEventListener('DOMContentLoaded', () => {
    const number_input = document.getElementById('number-input');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');

    const fetchCSV = (value_in) => {
        const fileName = 'csv/${value_in}.csv';
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
        number_input.value = new_value
        console.log(new_value)
        fetchCSV(new_value);
    });

    NextButton.addEventListener('click', () => {
        new_value = parseInt(number_input.value) + 1;
        number_input.value = new_value
        console.log(new_value)
        fetchCSV(new_value);
    });

    // Initial fetch
    fetchCSV();
});

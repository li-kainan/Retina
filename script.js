document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('number-input');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');

    const fetchCSV = () => {
        const fileName = 'csv/1.csv';
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
        input.value = parseInt(input.value) - 1;
        fetchCSV();
    });

    NextButton.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        fetchCSV();
    });

    // Initial fetch
    fetchCSV();
});

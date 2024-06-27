document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('number-input');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');

    const fetchCSV = () => {
        const fileName = '${input.value}.csv';
        fetch(fileName)
            .then(response => response.json())
            .then(data => {
                const csvFilename = data.filename;
                return fetch(csvFilename);
            })
            .then(response => response.text())
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        console.log(results.data);
                    }
                });
            })
            .catch(error => console.error('Error fetching the CSV file:', error));
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
document.addEventListener('DOMContentLoaded', () => {
    const NumberInput = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var SampleID = 1
    var Marker_Data
    var Canvas
    var Chart
    
    const fetch_CSV = () => {
        SampleID = parseInt(NumberInput.value)
        Marker_Data = []

        for (let i = 1; i < 4; i++) {
            FileName_path = ['csv/', SampleID.toString(), '_', i.toString(), '.csv']
            var FileName = FileName_path.join('');
            
            fetch(FileName)
                .then(response => response.text())
                .then(data => {
                    Papa.parse(data, {
                        header: true,
                        dynamicTyping: true,
                        complete: function(results) {
                            Marker_Data.push(results)
                        }
                    });
                });
        }
    };

    const drawImage = () => {
        SampleID = parseInt(NumberInput.value)
        image_path = ['image/', SampleID.toString(), '.png']
        var ImageName = image_path.join('');
        console.log(ImageName)
        
        var Canvas = document.getElementById('chart')
        var RetinaChart = Canvas.getContext('2d');
        RetinaChart.clearRect(0, 0, Canvas.width, Canvas.height);
        
        const RetinaImage = new Image();
        RetinaImage.src = ImageName;
        
        RetinaImage.onload = () => {
            // Draw the image onto the imageCanvas
            RetinaChart.drawImage(RetinaImage, 0, 0, Canvas.width, Canvas.height);
            fetch_CSV();
            drawLines();
        };
    }
    const update = () => {
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
        new_value = Math.min(new_value, 80)
        NumberInput.value = new_value
        fetch_CSV()
    });

    // Initial fetch
    fetch_CSV()

    function drawLines() {
        var Canvas = document.getElementById('chart')
        var RetinaChart = Canvas.getContext('2d');

        SampleID = parseInt(NumberInput.value)

        /*
        RetinaChart.beginPath();
        RetinaChart.moveTo(0,0);
        RetinaChart.lineTo(100 * (2+ValueIn), 100 * (1+ValueIn));
        RetinaChart.strokeStyle = 'red';
        RetinaChart.stroke();
        */
    }

    
});

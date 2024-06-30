document.addEventListener('DOMContentLoaded', () => {
    const NumberInput = document.getElementById('number-input');
    const ShowButton = document.getElementById('show-button');
    const LastButton = document.getElementById('last-button');
    const NextButton = document.getElementById('next-button');
    var SampleID = 1
    var Marker_ID
    var Marker_Data = []
    var Marker_Switch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

    function drawLines() {
        const Canvas = document.getElementById('chart')
        const RetinaChart = Canvas.getContext('2d');
        
        SampleID = parseInt(NumberInput.value)
        
        for (let i = 0; i < 10; i++) {
            Marker_ID = Marker_Switch[i]
            if (Marker_ID > 0) {
                Marker_ID = Marker_ID
            }
        }
        
        /*
        RetinaChart.beginPath();
        RetinaChart.moveTo(0,0);
        RetinaChart.lineTo(100 * (2+ValueIn), 100 * (1+ValueIn));
        RetinaChart.strokeStyle = 'red';
        RetinaChart.stroke();
        */
    }
    
    const drawImage = () => {
        SampleID = parseInt(NumberInput.value)
        image_path = ['image/', SampleID.toString(), '.png']
        var ImageName = image_path.join('');
        
        const Canvas = document.getElementById('chart')
        const RetinaChart = Canvas.getContext('2d');
        RetinaChart.clearRect(0, 0, Canvas.width, Canvas.height);
        
        var RetinaImage = new Image();
        RetinaImage.src = ImageName;
        
        RetinaImage.onload = () => {
            // Draw the image onto the imageCanvas
            RetinaChart.drawImage(RetinaImage, 0, 0, Canvas.width, Canvas.height);
            fetch_CSV();
            // drawLines();
        };
    }
    
    const update = () => {
        drawImage()
    }
        
    ShowButton.addEventListener('click', () => {
        update()
    });
    
    LastButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) - 1;
        new_SampleID = Math.max(new_SampleID, 1)
        NumberInput.value = new_SampleID
        update()
    });

    NextButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) + 1;
        new_SampleID = Math.min(new_SampleID, 80)
        NumberInput.value = new_SampleID
        update()
    });

    // Initial fetch
    update()


    
});

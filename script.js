const NumberInput = document.getElementById('number-input');
const ShowButton = document.getElementById('show-button');
const LastButton = document.getElementById('last-button');
const NextButton = document.getElementById('next-button');
const Canvas = document.getElementById('chart')
const RetinaChart = Canvas.getContext('2d');

var SampleID = 1
var FileName
var ImageName
var RetinaImage
var Marker_ID
var Marker_Data = []
var Marker_Switch = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
var LineData
var x
var y

document.addEventListener('DOMContentLoaded', () => {
    const fetch_CSV = () => {
        SampleID = parseInt(NumberInput.value)
        Marker_Data = []

        for (let i = 1; i < 4; i++) {
            FileName_path = ['csv/', SampleID.toString(), '_', i.toString(), '.csv']
            FileName = FileName_path.join('');
            
            fetch(FileName)
                .then(response => response.text())
                .then(data => {
                    Papa.parse(data, {
                        header: true,
                        dynamicTyping: true,
                        complete: function(results) {
                            Marker_Data.push(results)
                            if (Marker_Data.length == 3) {
                                console.log(Marker_Switch)
                                console.log(Marker_Data)
                                drawLines();
                            }
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
                LineData = Marker_Data[Marker_ID-1].data
                
                RetinaChart.beginPath();
                x = LineData[0]['x'] / 914 * Canvas.width
                y = LineData[0]['L'+(i+1).toString()] / 665 * Canvas.height
                RetinaChart.moveTo(x, y);
                for (let j = 1; j < LineData.length; j++) {
                    x = LineData[0]['x'] / 914 * Canvas.width
                    y = LineData[0]['L'+(i+1).toString()] / 665 * Canvas.height
                    RetinaChart.lineTo(x, y);
                }
                RetinaChart.strokeStyle = 'red';
                RetinaChart.stroke();
            }
        }
    }
    
    const drawImage = () => {
        SampleID = parseInt(NumberInput.value)
        image_path = ['image/', SampleID.toString(), '.png']
        ImageName = image_path.join('');
        
        const Canvas = document.getElementById('chart')
        const RetinaChart = Canvas.getContext('2d');
        RetinaChart.clearRect(0, 0, Canvas.width, Canvas.height);
        
        RetinaImage = new Image();
        RetinaImage.src = ImageName;
        
        RetinaImage.onload = () => {
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

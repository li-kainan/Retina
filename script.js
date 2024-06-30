const NumberInput = document.getElementById('number-input')
const ShowButton = document.getElementById('show-button')
const LastButton = document.getElementById('last-button')
const NextButton = document.getElementById('next-button')
const Canvas = document.getElementById('chart')
const RetinaChart = Canvas.getContext('2d')
var ToggleButton

var SampleID = 1
var FileName
var ImageName
var RetinaImage
var Marker_ID
var Marker_Data = []
var Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
var LineData
var x
var y

document.addEventListener('DOMContentLoaded', () => {
    const fetch_CSV = () => {
        SampleID = parseInt(NumberInput.value)
        Marker_Data = []

        for (let i = 1; i < 4; i++) {
            File_Path = ['csv/', SampleID.toString(), '_', i.toString(), '.csv']
            FileName = File_Path.join('')
            
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
                                drawImage()
                            }
                        }
                    })
                })
        }
    }

    function drawLines() {
        const Canvas = document.getElementById('chart')
        const RetinaChart = Canvas.getContext('2d')
        
        SampleID = parseInt(NumberInput.value)
        
        for (let i = 0; i < 10; i++) {
            Marker_ID = Marker_Switch[i]
            if (Marker_ID >= 0) {
                LineData = Marker_Data[Marker_ID].data
                
                RetinaChart.beginPath()
                x = LineData[0]['x'] / 914 * Canvas.width
                y = LineData[0]['L'+(i+1).toString()] / 665 * Canvas.height
                RetinaChart.moveTo(x, y)
                for (let j = 1; j < LineData.length; j++) {
                    x = LineData[j]['x'] / 914 * Canvas.width
                    y = LineData[j]['L'+(i+1).toString()] / 665 * Canvas.height
                    RetinaChart.lineTo(x, y)
                }
                RetinaChart.strokeStyle = 'red'
                RetinaChart.stroke()
            }
        }
    }
    
    const drawImage = () => {
        SampleID = parseInt(NumberInput.value)
        Image_Path = ['image/', SampleID.toString(), '.png']
        ImageName = Image_Path.join('')
        
        const Canvas = document.getElementById('chart')
        const RetinaChart = Canvas.getContext('2d')
        RetinaChart.clearRect(0, 0, Canvas.width, Canvas.height)
        
        var RetinaImage = new Image()
        RetinaImage.src = ImageName
        
        RetinaImage.onload = () => {
            RetinaChart.drawImage(RetinaImage, 0, 0, Canvas.width, Canvas.height)
            drawLines()
        }
    }
    
    const update = () => {
        fetch_CSV()
    }
        
    ShowButton.addEventListener('click', () => {
        update()
    })
    
    LastButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) - 1
        new_SampleID = Math.max(new_SampleID, 1)
        NumberInput.value = new_SampleID
        update()
    })

    NextButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) + 1
        new_SampleID = Math.min(new_SampleID, 80)
        NumberInput.value = new_SampleID
        update()
    })

    // Initial fetch
    update()

    const ToggleSwitch = (marker_id, layer_id) => {
        ToggleButton = document.getElementById('button_' + marker_id.toString() + layer_id.toString())
        
        if (Marker_Switch[layer_id] == marker_id) {
            Marker_Switch[layer_id] = -1
            ToggleButton.innerHTML = "off"
            ToggleButton.style.color = '#000000'
            ToggleButton.style.backgroundColor = '#F0F0F0'
        } else {
            for (let i = 0; i < 3; i++) {
                OtherButton = document.getElementById('button_' + i.toString() + layer_id.toString())
                OtherButton.innerHTML = "off"
                OtherButton.style.color = '#000000'
                OtherButton.style.backgroundColor = '#F0F0F0'
            }
            
            Marker_Switch[layer_id] = marker_id
            ToggleButton.innerHTML = "on"
            ToggleButton.style.color = '#FFFFFF'
            ToggleButton.style.backgroundColor = '#00A2E8'
        }
        
        drawImage()
    }

    for (let marker_id = 0; marker_id < 3; marker_id++) {
        for (let layer_id = 0; layer_id < 10; layer_id++) {
            ToggleButton = document.getElementById('button_' + marker_id.toString() + layer_id.toString())
            ToggleButton.addEventListener('click', () => {
                ToggleSwitch(marker_id, layer_id)
            })
        }
    }
    
})

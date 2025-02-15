const NumberInput = document.getElementById('number-input')
const ShowButton = document.getElementById('show-button')
const LastButton = document.getElementById('last-button')
const NextButton = document.getElementById('next-button')
const ResetButton = document.getElementById('reset-button')
const ImageCanvas = document.getElementById('image_layer')
const ImageLayer = ImageCanvas.getContext('2d')
const LineCanvas = document.getElementById('line_layer')
const LineLayer = LineCanvas.getContext('2d')

var ToggleButton
var SampleID = 1
var FileName
var ImageName
var RetinaImage
var Marker_ID
var Marker_Data = {}
var Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
const LineColors = ['#E6B0AA', '#D7BDE2', '#A9CCE3', '#A3E4D7', '#F9E79F', '#E74C3C', '#8E44AD', '#3498DB', '#2ECC71', '#F39C12']
var LineData
var x
var y

document.addEventListener('DOMContentLoaded', () => {
    
    const fetch_CSV = () => {
        SampleID = parseInt(NumberInput.value)
        if (!(SampleID in Marker_Data)) {
            Marker_Data[SampleID] = {}
            for (let i = 0; i < 3; i++) {
                File_Path = ['csv/', SampleID.toString(), '_', (i+1).toString(), '.csv']
                FileName = File_Path.join('')
                
                fetch(FileName)
                    .then(response => response.text())
                    .then(data => {
                        Papa.parse(data, {
                            header: true,
                            dynamicTyping: true,
                            complete: function(results) {
                                Marker_Data[SampleID][i] = results
                                if (Object.keys(Marker_Data[SampleID]).length == 3) {
                                    console.log(Marker_Data)
                                    drawImage()
                                }
                            }
                        })
                    })
            }
        }
    }

    function drawLines() {
        SampleID = parseInt(NumberInput.value)
        LineLayer.clearRect(0, 0, LineCanvas.width, LineCanvas.height)
        
        for (let i = 0; i < 10; i++) {
            Marker_ID = Marker_Switch[i]
            if (Marker_ID >= 0) {
                LineData = Marker_Data[SampleID][Marker_ID].data
                
                LineLayer.beginPath()
                x = LineData[0]['x'] / 914 * LineCanvas.width
                y = LineData[0]['L'+(i+1).toString()] / 665 * LineCanvas.height
                LineLayer.moveTo(x, y)
                for (let j = 1; j < LineData.length; j++) {
                    x = LineData[j]['x'] / 914 * LineCanvas.width
                    y = LineData[j]['L'+(i+1).toString()] / 665 * LineCanvas.height
                    LineLayer.lineTo(x, y)
                }
                LineLayer.strokeStyle = LineColors[i]
                LineLayer.stroke()
            }
        }
    }

    function drawLines_hover(marker_id, line_id) {
        SampleID = parseInt(NumberInput.value)
        LineLayer.clearRect(0, 0, LineCanvas.width, LineCanvas.height)
        
        for (let i = 0; i < 10; i++) {
            if (i == line_id) {
                Marker_ID = marker_id
            } else {
                Marker_ID = Marker_Switch[i]
            }
            
            if (Marker_ID >= 0) {
                LineData = Marker_Data[SampleID][Marker_ID].data
                
                LineLayer.beginPath()
                x = LineData[0]['x'] / 914 * LineCanvas.width
                y = LineData[0]['L'+(i+1).toString()] / 665 * LineCanvas.height
                LineLayer.moveTo(x, y)
                for (let j = 1; j < LineData.length; j++) {
                    x = LineData[j]['x'] / 914 * LineCanvas.width
                    y = LineData[j]['L'+(i+1).toString()] / 665 * LineCanvas.height
                    LineLayer.lineTo(x, y)
                }
                LineLayer.strokeStyle = LineColors[i]
                LineLayer.stroke()
            }
        }
    }
    
    const drawImage = () => {
        SampleID = parseInt(NumberInput.value)
        Image_Path = ['image/', SampleID.toString(), '.png']
        ImageName = Image_Path.join('')
        
        ImageLayer.clearRect(0, 0, ImageCanvas.width, ImageCanvas.height)
        
        var RetinaImage = new Image()
        RetinaImage.src = ImageName
        
        RetinaImage.onload = () => {
            ImageLayer.drawImage(RetinaImage, 0, 0, ImageCanvas.width, ImageCanvas.height)
            drawLines()
        }
    }
    
    const Reset = () => {
        result_cell = document.getElementById('case_id')
        result_cell.innerHTML = parseInt(NumberInput.value).toString()
        
        for (let i = 0; i < 10; i++) {
            result_cell = document.getElementById('L' + i.toString() + '_Grader')
            result_cell.innerHTML = ""
            
            for (let j = 0; j < 3; j++) {
                if (Marker_Switch[i] == j) {
                    OtherButton = document.getElementById('button_' + j.toString() + i.toString())
                    OtherButton.innerHTML = "on"
                    OtherButton.style.color = '#FFFFFF'
                    OtherButton.style.backgroundColor = '#00A2E8'
                    result_cell = document.getElementById('L' + i.toString() + '_Grader')
                    result_cell.innerHTML = (j+1).toString()
                } else {
                    OtherButton = document.getElementById('button_' + j.toString() + i.toString())
                    OtherButton.innerHTML = "off"
                    OtherButton.style.color = '#000000'
                    OtherButton.style.backgroundColor = '#F0F0F0'
                }
            }
        }
    }
    
    const update = () => {
        Reset()
        fetch_CSV()
    }
        
    ShowButton.addEventListener('click', () => {
        if (parseInt(NumberInput.value) != SampleID) {
            Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        }
        update()
    })
    
    LastButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) - 1
        new_SampleID = Math.max(new_SampleID, 1)
        if (new_SampleID != SampleID) {
            Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        }
        NumberInput.value = new_SampleID
        update()
    })

    NextButton.addEventListener('click', () => {
        new_SampleID = parseInt(NumberInput.value) + 1
        new_SampleID = Math.min(new_SampleID, 80)
        if (new_SampleID != SampleID) {
            Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        }
        NumberInput.value = new_SampleID
        update()
    })

    ResetButton.addEventListener('click', () => {
        Marker_Switch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        update()
    })

    // Initial fetch
    update()
    
    const ToggleSwitch = (marker_id, line_id) => {
        ToggleButton = document.getElementById('button_' + marker_id.toString() + line_id.toString())
        
        if (Marker_Switch[line_id] == marker_id) {
            Marker_Switch[line_id] = -1
            ToggleButton.innerHTML = "off"
            ToggleButton.style.color = '#000000'
            ToggleButton.style.backgroundColor = '#F0F0F0'

            result_cell = document.getElementById('L' + line_id.toString() + '_Grader')
            result_cell.innerHTML = ""
        } else {
            for (let i = 0; i < 3; i++) {
                OtherButton = document.getElementById('button_' + i.toString() + line_id.toString())
                OtherButton.innerHTML = "off"
                OtherButton.style.color = '#000000'
                OtherButton.style.backgroundColor = '#F0F0F0'
            }
            
            Marker_Switch[line_id] = marker_id
            ToggleButton.innerHTML = "on"
            ToggleButton.style.color = '#FFFFFF'
            ToggleButton.style.backgroundColor = '#00A2E8'
            
            result_cell = document.getElementById('L' + line_id.toString() + '_Grader')
            result_cell.innerHTML = (marker_id+1).toString()
        }
        
        drawLines()
    }

    const ToggleHover = (marker_id, line_id) => {
        ToggleButton = document.getElementById('button_' + marker_id.toString() + line_id.toString())
        
        if (Marker_Switch[line_id] == marker_id) {
            Marker_Switch[line_id] = -1
            ToggleButton.innerHTML = "off"
            ToggleButton.style.color = '#000000'
            ToggleButton.style.backgroundColor = '#F0F0F0'
        } else {
            for (let i = 0; i < 3; i++) {
                OtherButton = document.getElementById('button_' + i.toString() + line_id.toString())
                OtherButton.innerHTML = "off"
                OtherButton.style.color = '#000000'
                OtherButton.style.backgroundColor = '#F0F0F0'
            }
            
            Marker_Switch[line_id] = marker_id
            ToggleButton.innerHTML = "on"
            ToggleButton.style.color = '#FFFFFF'
            ToggleButton.style.backgroundColor = '#00A2E8'
        }
        
        drawLines()
    }

    for (let marker_id = 0; marker_id < 3; marker_id++) {
        for (let line_id = 0; line_id < 10; line_id++) {
            ToggleButton = document.getElementById('button_' + marker_id.toString() + line_id.toString())
            ToggleButton.innerHTML = "off"
            ToggleButton.style.color = '#000000'
            ToggleButton.style.backgroundColor = '#F0F0F0'
            
            ToggleButton.addEventListener('click', () => {ToggleSwitch(marker_id, line_id)})
            ToggleButton.addEventListener('mouseover', () => {drawLines_hover(marker_id, line_id)})
            ToggleButton.addEventListener('mouseout', () => {drawLines()})
        }
    }
    
})

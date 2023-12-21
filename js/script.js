//global variables
let gridContainer = document.getElementById("grid-container")
let grids = document.getElementsByClassName("single-grid");
let gridSelector = document.getElementById("grid-picker");
let gridSelectorDisplay = document.getElementById("grid-selector-display");
let rainbowBtn = document.getElementById("rainbow-button");
let colorPicker = document.getElementById("color-picker");
let progDarkBtn = document.getElementById("prog-dark-button");
let presentColor;
let labelElement = document.getElementById("label-color")

let labelColor = window.getComputedStyle(labelElement).backgroundColor;

let rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#9400D3"  // Violet
  ];
let rainbowIndex = 0;
let currentBrightness = 100;
let minBrightness = 10;

colorPicker.addEventListener ("input", function() {
    labelElement.style.backgroundColor = colorPicker.value;
})


gridSelector.addEventListener("input", function() {

// variables
let gridSliderValue = event.target.value;
let noOfGrids = gridSliderValue ** 2
let noOfDivs = gridContainer.childElementCount;
let gridsToCreate = noOfGrids - noOfDivs;
let gridsToRemove = noOfDivs - noOfGrids;

gridSelectorDisplay.innerHTML = `${gridSliderValue}x${gridSliderValue}`;
gridContainer.style.gridTemplateColumns = "repeat(" + gridSelector.value + ", 1fr)";
gridContainer.style.gridTemplateRows = "repeat(" + gridSelector.value + ", 1fr)";


   for (let i = 0; i < gridsToCreate; i++) {  //create grids dynamically
    let gridCreate = document.createElement("div");
    gridCreate.classList.add("single-grid");
    gridContainer.appendChild(gridCreate);
   }

    for (let i = 0; i < gridsToRemove; i++) { //remove grids dynamically 
        gridContainer.removeChild(gridContainer.lastChild);
    }



    for (grid of grids) {
        grid.addEventListener("mouseover", function(e) {
    if (rainbowBtn.classList.contains("active")) {
        rainbowMode(e);
    }  else {
        e.target.style.backgroundColor = colorPicker.value;
    }
    }
    )}


//COLOR PICKER MODE
colorPicker.addEventListener("click", colorPickerActivate);

function colorPickerActivate() {
        rainbowBtn.classList.remove("active");
    
        for (grid of grids) {
                grid.removeEventListener("mouseover", rainbowMode);
                grid.addEventListener("mouseover", colorPickerMode);
            }
        }
    
function colorPickerMode(e) {
        e.target.style.backgroundColor = colorPicker.value;
    }



//RAINBOW MODE
rainbowBtn.addEventListener("click", function() {
    rainbowBtn.classList.add("active");
});

rainbowBtn.addEventListener("click", rainbowActivate);

function rainbowActivate() {
    rainbowBtn.classList.toggle("active");

    for (grid of grids) {
            grid.removeEventListener("mouseover", colorPickerMode);
            grid.addEventListener("mouseover", rainbowMode);
        }
}


//PROGRESSIVE DARK MODE
progDarkBtn.addEventListener("click", progDarkActivate);    


function progDarkActivate() {
    progDarkBtn.classList.toggle("active");
    
    if (progDarkBtn.classList.contains("active")) {
    progDarkBtn.textContent = "Progressive Dark: ON"
    for (grid of grids) {
        grid.addEventListener("mouseover", progDarkMode);
    }
    } else {
        progDarkBtn.textContent = "Progressive Dark: OFF"
    for (grid of grids) {
        grid.removeEventListener("mouseover", progDarkMode);
    }
    }
}


});  // end of function


rainbowBtn.addEventListener("click", function() {
    rainbowBtn.classList.toggle("active");
});

progDarkBtn.addEventListener("click", function(e) {
    progDarkBtn.classList.toggle("active");

   
    if (progDarkBtn.classList.contains("active")) {
        progDarkBtn.textContent = "Progressive Dark: ON"
        for (grid of grids) {
            grid.addEventListener("mouseover", progDarkMode);
        }
        } else {
            progDarkBtn.textContent = "Progressive Dark: OFF"
        for (grid of grids) {
            grid.removeEventListener("mouseover", progDarkMode);
        }
        }
});    


function rainbowMode(e) {
    if (rainbowIndex === 0) {
        rainbowIndex++;
        e.target.style.backgroundColor = rainbowColors[0];
    }
    else if (rainbowIndex === rainbowColors.length) {
        rainbowIndex = 0;
        rainbowIndex++;
        e.target.style.backgroundColor = rainbowColors[0]; 
    }
    else if (rainbowIndex > 0) {
    nextColor = rainbowColors[rainbowIndex]
    rainbowIndex++;
    e.target.style.backgroundColor = nextColor;
    }
}


function progDarkMode(e) {
    if (currentBrightness >= minBrightness) {
        currentBrightness -= 10;
        console.log(`after: `, currentBrightness);
        e.target.style.filter = `brightness(${currentBrightness}%)`;
    } else {
        // Reset brightness to 100% when it reaches the minimum
        currentBrightness = 100;
        e.target.style.filter = `brightness(${currentBrightness}%)`;
    }
}


for (grid of grids) {
    grid.addEventListener("mouseover", function(e) {
if (rainbowBtn.classList.contains("active")) {
    rainbowMode(e);
} else {
    e.target.style.backgroundColor = colorPicker.value;
}
    }
    )}



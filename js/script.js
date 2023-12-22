//global variables
let gridContainer = document.getElementById("grid-container")
let grids = document.getElementsByClassName("single-grid");
let gridSelector = document.getElementById("grid-picker");
let gridSelectorDisplay = document.getElementById("grid-selector-display");
let rainbowBtn = document.querySelector(".rainbow-button");
let colorPicker = document.getElementById("color-picker");
let progDarkBtn = document.getElementById("prog-dark-button");
let presentColor;
let labelElement = document.getElementById("label-color");

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
let noOfGrids = gridSliderValue ** 2;
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

addGridEventListeners();
});  // END OF THIS FUNCTION

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

        if (!progDarkBtn.classList.contains("active")) {
            e.target.style.filter = "brightness(100%)";
        }
    }


//RAINBOW MODE
rainbowBtn.addEventListener("click", function() {
    rainbowBtn.classList.add("active");
});

rainbowBtn.addEventListener("click", rainbowActivate);

function rainbowActivate() {
    rainbowBtn.classList.add("active");

    for (grid of grids) {
            grid.removeEventListener("mouseover", colorPickerMode);
            grid.addEventListener("mouseover", rainbowMode);
        }
}

rainbowBtn.addEventListener("click", function() {
    rainbowBtn.classList.add("active");
});



function rainbowMode(e) {
if (!progDarkBtn.classList.contains("active")) {
    e.target.style.filter = "brightness(100%)";    
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
} else {    
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
}


for (grid of grids) {
    grid.addEventListener("mouseover", function(e) {
        if (rainbowBtn.classList.contains("active")) {
        rainbowMode(e);
        } else if (progDarkBtn.classList.contains("active")) {
        progDarkMode(e);
        } else if (!progDarkBtn.classList.contains("active")) {
        e.target.style.filter = "brightness(100%)";
        } else {
        e.target.style.backgroundColor = colorPicker.value;
        }        
    });
}



//PROGRESSIVE DARK MODE
for (let grid of grids) {
    progDarkBtn.addEventListener("click", toggleDarkMode)
}

function toggleDarkMode() {
    if (progDarkBtn.classList.contains("active")) {
        progDarkBtn.classList.remove("active");
        progDarkBtn.textContent = "Progressive Dark: OFF";
        for (let grid of grids) {
        grid.removeEventListener("mouseover", progDarkMode);
    }} else {
        progDarkBtn.classList.add("active");
        progDarkBtn.textContent = "Progressive Dark: ON";
        for (let grid of grids) {
        grid.addEventListener("mouseover", progDarkMode);
    }}       
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


function addGridEventListeners() {
    for (let grid of grids) {
        grid.addEventListener("mouseover", function(e) {
            if (rainbowBtn.classList.contains("active")) {
                rainbowMode(e);
            } else if (progDarkBtn.classList.contains("active")) {
                progDarkMode(e);
            } else if (!progDarkBtn.classList.contains("active")) {
                e.target.style.filter = "brightness(100%)";
                e.target.style.backgroundColor = colorPicker.value;
            } else {
                e.target.style.backgroundColor = colorPicker.value;
            }
        });
    }
}

colorPickerActivate();
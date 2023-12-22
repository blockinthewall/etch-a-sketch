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
    
        for (let grid of grids) {
            if (isTouchDevice()) {
                grid.removeEventListener("mouseover", colorPickerMode);
    
                grid.addEventListener("touchstart", handleTouchStart);
                grid.addEventListener("touchend", handleTouchEnd);
            } else {
                grid.removeEventListener("touchstart", handleTouchStart);
                grid.removeEventListener("touchend", handleTouchEnd);
    
                grid.addEventListener("mouseover", colorPickerMode);
            }
        }
    }

function handleTouchStart(e) {
    e.target.classList.add('hovered');
}

function handleTouchEnd(e) {
    e.target.classList.remove('hovered');
    handleGridEvent(e);
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

        if (isTouchDevice()) {
            e.target.style.backgroundColor = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        } else {
            e.target.style.backgroundColor = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        }
    }
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
        }
    } else {
        progDarkBtn.classList.add("active");
        progDarkBtn.textContent = "Progressive Dark: ON";
        for (let grid of grids) {
            grid.addEventListener("mouseover", progDarkMode);
        }
    }
}

    function progDarkMode(e) {
        if (currentBrightness >= minBrightness) {
            currentBrightness -= 10;
            console.log(`after: `, currentBrightness);
            e.target.style.filter = `brightness(${currentBrightness}%)`;
        } else {
            currentBrightness = 100;
            e.target.style.filter = `brightness(${currentBrightness}%)`;
        }
    }
    

    function addGridEventListeners() {
        for (let grid of grids) {
            if (isTouchDevice()) {
                grid.addEventListener("touchstart", handleTouchStart);
                grid.addEventListener("touchend", handleTouchEnd);
            } else {
                grid.removeEventListener("touchstart", handleTouchStart);
                grid.removeEventListener("touchend", handleTouchEnd);
    
                
                grid.addEventListener("mouseover", function (e) {
                    handleGridEvent(e);
                });
            }
        }
    }
    
    function handleGridEvent(e) {
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
    }
    
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    
    colorPickerActivate();
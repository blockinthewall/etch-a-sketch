let gridContainer = document.getElementById("grid-container")
let grids = document.getElementsByClassName("single-grid");
let gridSelector = document.getElementById("grid-picker");
let gridSelectorDisplay = document.getElementById("grid-selector-display");
let rainbowBtn = document.getElementById("rainbow-button");
let colorPicker = document.getElementById("color-picker");
let presentColor;
let newColor;


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


gridSelector.addEventListener("input", function() {
   let gridSliderValue = event.target.value;
   gridSelectorDisplay.innerHTML = `${gridSliderValue}x${gridSliderValue}`;
   gridContainer.style.gridTemplateColumns = "repeat(" + gridSelector.value + ", 1fr)";
   gridContainer.style.gridTemplateRows = "repeat(" + gridSelector.value + ", 1fr)";

   let noOfGrids = gridSliderValue ** 2
   let noOfDivs = gridContainer.childElementCount;
   let gridsToCreate = noOfGrids - noOfDivs;
   let gridsToRemove = noOfDivs - noOfGrids;

   for (let i = 0; i < gridsToCreate; i++) {  //create grids dynamically
    let gridCreate = document.createElement("div");
    gridCreate.classList.add("single-grid");
    gridContainer.appendChild(gridCreate);
   }

for (let i = 0; i < gridsToRemove; i++) { //remove grids dynamically 
    gridContainer.removeChild(gridContainer.lastChild);
}

});


function rainbowMode() {
    if (rainbowIndex === 0) {
        rainbowIndex++;
        return rainbowColors[0];
    }
    else if (rainbowIndex === rainbowColors.length) {
        rainbowIndex = 0;
        rainbowIndex++;
        return rainbowColors[0]; 
    }
    else if (rainbowIndex > 0) {
        for (let i = 0; i < rainbowIndex; i++) {
    nextColor = rainbowColors[rainbowIndex]
    }
    rainbowIndex++;
    return nextColor;
}       
}

rainbowBtn.addEventListener("click", rainbowActivate);

function rainbowActivate() {
colorPicker.removeEventListener("input", colorPickerActivate);


for (grid of grids) {
        grid.removeEventListener("mouseover", colorPickerHover);
        grid.addEventListener("mouseover", rainbowHover);
    }

}
colorPicker.addEventListener("input", colorPickerActivate);

function colorPickerActivate() {
rainbowBtn.removeEventListener("click", rainbowActivate);



    for (grid of grids) {
        grid.removeEventListener("mouseover", rainbowHover);
        grid.addEventListener("mouseover", colorPickerHover);
        
    }
}

function rainbowHover(e) {
    e.target.style.backgroundColor = rainbowMode();
}

function colorPickerHover(e) {
    e.target.style.backgroundColor = colorPicker.value;
}
//select elements
const colorInput = document.querySelector("#color-input");
const colorSchemeInput = document.querySelector("#color-scheme");
const getColorSchemeBtn = document.querySelector("#get-color-scheme");
const displayColorContainers = document.querySelectorAll(".color-display");
const displayHexColorContainers = document.querySelectorAll(".hex-display");

const copymessage = document.querySelector(".message");

//Initialisations
let currentScheme;
let currentColor;

//Event Listeners

// if changes on color
colorInput.addEventListener("change", function(){ //changes event detect if there is something changes
    currentColor = (colorInput.value).slice(1); //generate color in hex without a # (eg: ffffff), slice(1) remove 1st char.
    console.log(currentColor);
});

// if changes on color scheme
colorSchemeInput.addEventListener("change", function(){
    currentScheme = colorSchemeInput.value;
    console.log(currentScheme);
})

/*  Fetch Color Scheme
Base Url: https://www.thecolorapi.com
Endpoints: /scheme
Query: ?hex=ff0000&format=html&mode=monochrome&count=5
*/

getColorSchemeBtn.addEventListener("click", function(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentScheme}&count=5`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        copymessage.style.display = "initial";

        for(let i=0; i<5; i++){
            let currentSubColor = data.colors[i].hex.value //retrieves 1st color out of 5 color
            console.log(currentSubColor);

            displayColorContainers[i].style.backgroundColor = currentSubColor //set containers with colors
            displayHexColorContainers[i].textContent = currentSubColor //set hex code for every container

            //copy to clipboard feature

            //if i click on color hexcode will copy on clipboard
            displayColorContainers[i].addEventListener("click", function(){
                navigator.clipboard.writeText(currentSubColor).then(function(){ //i click on color it will add on clipboard
                    copymessage.textContent = `${currentSubColor} copied to clipboard`; //shows the message on bottom
                });
            })

            //if i click on hexcode it will copy on clipboard
            displayHexColorContainers[i].addEventListener("click", function(){
                navigator.clipboard.writeText(currentSubColor).then(function(){
                    copymessage.textContent = `${currentSubColor} copied to clipboard`;
                });
            })

        }
    })    
});

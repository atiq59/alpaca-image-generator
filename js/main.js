'use strict';

const imageContainer = document.getElementById("image-container");
const btnsAcessorizeContainer = document.getElementById("btns-acessorize");
const btnStylesContainer = document.getElementById("btns-style");
const btnRandomOnClick = document.getElementById("btn_random");
const btnDownloadOnClick = document.getElementById("btn_download");
const positions = [4, 0, 0, 0, 0, 0, 3, 0];

const AlpacaLists = [
    {id: 7, category: "backgrounds", parts: ["blue50", "blue60", "blue70", "darkblue30", "darkblue50", "darkblue70", "green50", "green60", "green70", "grey40", "grey70", "grey80", "red50", "red60", "red70", "yellow50", "yellow60", "yellow70"]},
    {id: 4, category: "neck", parts: ["default", "bend-backward", "bend-forward", "thick"]},
    {id: 1, category: "ears", parts: ["default", "tilt-backward", "tilt-forward"]},
    {id: 0, category: "hair", parts: ["default", "bang", "curls", "elegant", "fancy", "short"]},
    {id: 2, category: "eyes", parts: ["default", "angry", "naughty", "panda", "smart", "star"]},
    {id: 5, category: "leg", parts: ["default", "bubble-tea", "cookie", "game-console", "tilt-backward", "tilt-forward"]},
    {id: 6, category: "accessories", parts: ["earings", "flower", "glasses", "headphone"]},
    {id: 3, category: "mouth",  parts: ["default", "astonished", "eating", "laugh", "tongue"]},
];


function generateAlpacaImage() {
    imageContainer.innerHTML = "";

    const generatedImages = positions.map((position, index) => {
        return `<img id="${AlpacaLists[index].id}" class="alpaca-component" src="images/alpaca/${AlpacaLists[index].category}/${AlpacaLists[index].parts[position]}.png" alt="Alpaca ${AlpacaLists[index].category}">`;
    });
   

    generatedImages.splice(2, 0, `<img id="ignore" class="alpaca-component" src="images/alpaca/nose.png" alt="Alpaca Nose">`);

    imageContainer.innerHTML = generatedImages;
    
    UpdateDownloadLink();
}

function renderAcessorizeButtons() {
    const buttonList = AlpacaLists.map(button => `<button class="btn btn-round" style="order:${button.id}">${button.category}</button>`);
    
    btnsAcessorizeContainer.innerHTML = buttonList.join("");

    const renderedButtons = Array.from(btnsAcessorizeContainer.querySelectorAll(".btn"));
    renderedButtons[3].classList.add("btn-primary");

    renderedButtons.forEach((button, index) => button.addEventListener("click", ()=>{
        changeButtonsClass("btn-primary", button, renderedButtons);
        renderStyleButtons(index);
    }));
}

function renderStyleButtons(CurrentButtonIndex = 3) {
    const buttonList = AlpacaLists[CurrentButtonIndex].parts.map(button => `<button class="btn btn-round">${button}</button>`);
    btnStylesContainer.innerHTML = buttonList.join("");

    const renderedButtons = Array.from(btnStylesContainer.querySelectorAll(".btn"));
    renderedButtons[positions[CurrentButtonIndex]].classList.add("btn-primary");

    renderedButtons.forEach((button, index) => button.addEventListener("click", ()=>{
        changeButtonsClass("btn-primary", button, renderedButtons);
        // Tornar o código acima reaproveitável, a função abaixo será extra
        positions[CurrentButtonIndex] = index;
        generateAlpacaImage();
    }));
}

function changeButtonsClass(ButtonClass = "", currentButton = {}, buttonList = []) {
    buttonList.map(button => button.classList.remove(ButtonClass));
    currentButton.classList.add(ButtonClass);
}

function randomizePositions() {
    AlpacaLists.forEach((Currentlist, index) => positions[index] = Math.floor(Math.random() * Currentlist.parts.length));
    generateAlpacaImage();
}

function UpdateDownloadLink () {
    html2canvas(imageContainer, {width: 350, height: 350}).then(function(canvas) {
        btnDownloadOnClick.href = canvas.toDataURL();
        btnDownloadOnClick.download = "alpaca.jpg";
    });
}

btnRandomOnClick.addEventListener("click", randomizePositions);

generateAlpacaImage();
renderAcessorizeButtons();
renderStyleButtons();
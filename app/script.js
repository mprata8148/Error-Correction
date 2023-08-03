// script.js

let Bit_Array = [];

function handleWindowResize() {
    updateText();
}

// Attach an event listener to the window's resize event
window.addEventListener('resize', handleWindowResize);
function updateText() {
    var dropdown = document.getElementById("dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].text;
    var spanElement = document.querySelector(".text");

    spanElement.textContent = selectedOption;
    update_menu(selectedOption)

    if (selectedOption == "Brute Force") {
        CreateLegendBF();
        draw_grid();
    }
    else if (selectedOption == "Hamming") {
        CreateLegendHam();
        Hamming_Code();
    }
    else{
        CreateLegendRS();
        ReedSolomonMain();

    }
}

function update_menu(selectedOption) {
    var menu = document.getElementById("Menu");
    var button1 = document.getElementById("size");
    var options1 = button1.getElementsByTagName("option");
    var button2 = document.getElementById("copies");
    if (button2 === null) {
        button2 = document.createElement("select");
        button2.setAttribute("id", "copies");
        button2.setAttribute("class", "menu_button");
        button2.setAttribute("onchange", "updateText()");
        menu.appendChild(button2);
    }
    var options2 = button2.getElementsByTagName("option");
    for (let i = options2.length; i < 3; i++) {
        var newOption = document.createElement("option");
        newOption.textContent = "";
        button2.appendChild(newOption)
    }

    if (selectedOption == "Brute Force") {
        options1[0].textContent = "8 bit";
        options1[1].textContent = "16 bit";
        options1[2].textContent = "20 bit";
        options1[0].value = "8 bit";
        options1[1].value = "16 bit";
        options1[2].value = "20 bit";
        options2[0].textContent = "3 copies";
        options2[1].textContent = "4 copies";
        options2[2].textContent = "5 copies";
    }
    else if (selectedOption == "Hamming") {
        options1[0].textContent = "2X2";
        options1[1].textContent = "4X4";
        options1[2].textContent = "8X8";
        options1[0].value = "2X2";
        options1[1].value = "4X4";
        options1[2].value = "8X8";
        while (button2.firstChild) {
            button2.removeChild(button2.firstChild);
        }
        button2.remove();
    }
    // Hamming
    else{
        ReedSolomonSettings();
    }
}

function changeValue(event) {
    const clickedElement = event.target;
    const currentValue = clickedElement.innerText;
    if (currentValue === "1") {
        clickedElement.innerText = "0";
    } else if (currentValue === "0") {
        clickedElement.innerText = "1";
    }
}


function clickedStart(start) {
    const currentValue = start.innerText;
    var dropdown = document.getElementById("dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].text;
    if (currentValue === "Start") {
        start.innerText = "Stop";
    } else {
        start.innerText = "Start";
    }
    if (start.innerText === "Stop" || "Generate Error Bits") {
        if (selectedOption === "Brute Force") {
            BruteForceAnimation(start);
        }
        else if (selectedOption === "Hamming") {
            // console.log("HAMMING");
            Hamming_Code_Animation();
        }
        else{
            Lagrange_Interpolation(N_Array);
        }
    }
}
function clickedExplain(){
    var dropdown = document.getElementById("dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].text;
    // console.log(selectedOption);
    switch(selectedOption){
        case "Brute Force":
            bruteForceExp();
            break;
        case "Hamming":
            hammingExp();
            break;
        default:
            break;
    }
}

function getNumbersWithOneBit(number) {
    var binaryString = number.toString(2);
    var numbersWithOneBit = [];
    for (var i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
            var pow = binaryString.length - i - 1;
            var numberWithOneBit = Math.pow(2, pow);
            if (numberWithOneBit !== number) {
                numbersWithOneBit.push(numberWithOneBit);
            }
        }
    }
    return numbersWithOneBit;
}








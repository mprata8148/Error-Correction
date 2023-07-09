// script.js

// function updatePlaceholder() {
//     var dropdown = document.getElementById("dropdown");
//     var selectedOption = dropdown.options[dropdown.selectedIndex];
//     var selectedText = selectedOption.text;
//     var selectedValue = selectedOption.value;
//     var title = document.querySelector(".text");
//     title.textContent = selectedText;
// }
let Bit_Array = [];
function updateText() {

    var dropdown = document.getElementById("dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].text;
    var spanElement = document.querySelector(".text");

    spanElement.textContent = selectedOption;
    update_menu(selectedOption)
    if (selectedOption == "Brute Force") {
        draw_grid();
    }
    else if (selectedOption == "Hamming") {
        Hamming_Code();
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

function draw_grid() {
    var bit_count = document.getElementById("size").value;
    var numericPart = bit_count.split(" ")[0]; // Extract the numeric part before the first space
    var bit_count_number = parseInt(numericPart, 10);
    var copy_count = document.getElementById("copies").value;
    var numericCopy = copy_count.split(" ")[0]; // Extract the numeric part before the first space
    var copy_count_num = parseInt(numericCopy, 10);
    var shapeContainer = document.getElementById("top_content");
    var total_height = document.getElementById("content").offsetHeight;
    var total_width = document.getElementById("content").offsetWidth;
    var width = total_width / (bit_count_number + 4);
    var height = width;
    var left_step = 2 * width;
    var top_step = 10;
    if (bit_count_number === 8) {
        width = total_width / (bit_count_number + 6);
        left_step = 3 * width;
        height = width;
    }
    Bit_Array = [];
    for (let i = 0; i < bit_count_number; i++) {
        var randomNumber = Math.round(Math.random());
        Bit_Array.push(randomNumber);
    }
    while (shapeContainer.firstChild) {
        shapeContainer.removeChild(shapeContainer.firstChild);
    }

    //------------------------------------------//
    for (let i = 0; i < copy_count_num; i++) {
        for (let j = 0; j < bit_count_number; j++) {
            // var randomNumber = Math.round(Math.random());
            var rectangle = document.createElement("div");
            rectangle.style.width = width + "px";
            rectangle.style.height = height + "px";
            rectangle.style.left = left_step + "px";
            rectangle.style.top = top_step + "px";
            rectangle.classList.add("rectangle");
            rectangle.innerText = Bit_Array[j];
            rectangle.addEventListener("click", changeValue);
            left_step += width;
            shapeContainer.appendChild(rectangle);

        }
        left_step = bit_count_number === 8 ? 3 * width : 2 * width;
        top_step += height + 5;
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
    if (start.innerText === "Stop") {
        if (selectedOption === "Brute Force") {
            BruteForceAnimation(start);
        }
        else if (selectedOption === "Hamming") {
            Hamming_Code_Animation();
        }
    }
}

function BruteForceAnimation(start) {
    var bit_count = document.getElementById("size").value;
    var numericPart = bit_count.split(" ")[0]; // Extract the numeric part before the first space
    var bit_count_number = parseInt(numericPart, 10);
    var copy_count = document.getElementById("copies").value;
    var numericCopy = copy_count.split(" ")[0]; // Extract the numeric part before the first space
    var copy_count_num = parseInt(numericCopy, 10);
    var Boxes = document.getElementById("top_content");
    var temp_array = [];
    for (let i = 0; i < bit_count_number; i++) {
        temp_array.push(0);
    }
    let index = 0
    for (let i = 0; i < copy_count_num; i++) {
        for (let j = 0; j < bit_count_number; j++) {
            let temp = Boxes.children[index];
            let value = parseInt(temp.textContent, 10);

            temp_array[j] += value;
            index += 1;
        }
    }
    for (let i = 0; i < bit_count_number; i++) {
        var value = temp_array[i];
        var half = copy_count_num / 2;

        if (value >= half && value !== 0) {
            temp_array[i] = 1;
        }
        else {
            temp_array[i] = 0;
        }
    }
    ///////////////////////////////////////////////
    var total_width = document.getElementById("content").offsetWidth;
    // var total_height = document.getElementById("content").offsetHeight;
    var width = total_width / (bit_count_number + 4);
    var height = width;
    var left_step = 2 * width;
    if (bit_count_number === 8) {
        width = total_width / (bit_count_number + 6);
        left_step = 3 * width;
        height = width;
    }
    var starting_height = (height + 5) * copy_count_num + height;
    for (let i = 0; i < bit_count_number; i++) {
        var rectangle = document.createElement("div");
        rectangle.style.width = width + "px";
        rectangle.style.height = height + "px";
        rectangle.style.left = left_step + "px";
        rectangle.style.top = starting_height + "px";
        rectangle.classList.add("rectangle");
        rectangle.innerText = temp_array[i];
        if (Bit_Array[i] === temp_array[i]) {
            rectangle.style.backgroundColor = "#458b53";
        }
        else {
            rectangle.style.backgroundColor = "#e1675b";
        }
        left_step += width;
        Boxes.appendChild(rectangle);
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


function Hamming_Code() {
    var shapeContainer = document.getElementById("top_content");
    var button1 = document.getElementById("size");
    var grid_size = parseInt(button1.value.split("x")[0]);
    var total_height = document.getElementById("content").offsetHeight / 2;
    var total_width = document.getElementById("content").offsetWidth / 2;
    var base = (total_height > total_width ? total_width : total_height);
    var width = base / (grid_size + 2);
    var left = total_width / 2 - width * (grid_size / 2);
    var top_step = width;
    var bit_array = [];
    var parity_bits = new Set();
    while (shapeContainer.firstChild) {
        shapeContainer.removeChild(shapeContainer.firstChild);
    }
    for (let i = 0; i < grid_size * grid_size; i++) {
        if (i === 0) {
            bit_array.push(0);
            continue;
        }
        var randomNumber = Math.round(Math.random());
        bit_array.push(randomNumber);
        if (Math.log2(i) % 1 === 0) {

            bit_array[i] = 0;
            parity_bits.add(i);
        }
        else {
            var oneBitNums = getNumbersWithOneBit(i);

            for (let i = 0; i < oneBitNums.length; i++) {

                bit_array[oneBitNums[i]] = ((bit_array[oneBitNums[i]] + randomNumber) % 2 === 1 ? 1 : 0);
            }
        }
    }
    var count = 0;
    for (let i = 0; i < grid_size * grid_size; i++) {
        if (i === 0) { continue; }
        count += bit_array[i];
    }
    bit_array[0] = (count % 2 === 0 ? 0 : 1);
    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            var rectangle = document.createElement("div");
            rectangle.style.width = width + "px";
            rectangle.style.height = width + "px";
            rectangle.style.left = left + "px";
            rectangle.style.top = top_step + "px";
            rectangle.classList.add("rectangle");

            let index = (j + (i * grid_size))
            if (parity_bits.has(index)) {
                rectangle.style.backgroundColor = "#458b53";
                rectangle.addEventListener("mouseover", function () {
                    parity_bit_hover(index, shapeContainer);
                });
                rectangle.addEventListener("mouseout", function () {
                    parity_bit_hover_off(index, shapeContainer);
                });
            }
            if (index === 0) {
                rectangle.style.backgroundColor = "#1c722d";
            }

            rectangle.innerText = bit_array[index];
            left += width;
            rectangle.addEventListener("click", changeValue);
            shapeContainer.appendChild(rectangle);

        }
        top_step += width
        left = total_width / 2 - width * (grid_size / 2);
    }

}
function checkAlignedBits(num1, num2) {
    var binary1 = num1.toString(2);
    var binary2 = num2.toString(2);

    var maxLength = Math.max(binary1.length, binary2.length);

    binary1 = binary1.padStart(maxLength, '0');
    binary2 = binary2.padStart(maxLength, '0');

    for (var i = 0; i < maxLength; i++) {
        if (binary1.charAt(i) === '1' && binary2.charAt(i) === '1') {
            return true;
        }
    }

    return false;
}
function parity_bit_hover(index, shapeContainer) {
    var button1 = document.getElementById("size");
    var grid_size = parseInt(button1.value.split("x")[0]);
    for (let i = 0; i < shapeContainer.childNodes.length; i++) {
        var childElement = shapeContainer.children[i];
        if (checkAlignedBits(index, i) && index !== i) {
            childElement.style.backgroundColor = "#9ed795";
        }
        if (i >= grid_size * grid_size) { break; }
    }
}
function parity_bit_hover_off(index, shapeContainer) {
    var button1 = document.getElementById("size");
    var grid_size = parseInt(button1.value.split("x")[0]);
    for (let i = 0; i < shapeContainer.childNodes.length; i++) {
        var childElement = shapeContainer.children[i];
        if (checkAlignedBits(index, i) && index !== i) {
            childElement.style.backgroundColor = "#868383";
        }
        if (i >= grid_size * grid_size) { break; }
    }
}


function Hamming_Code_Animation() {
    var shapeContainer = document.getElementById("top_content");
    var button1 = document.getElementById("size");
    var grid_size = parseInt(button1.value.split("x")[0]);
    var total_height = document.getElementById("content").offsetHeight / 2;
    var total_width = document.getElementById("content").offsetWidth / 2;
    var base = (total_height > total_width ? total_width : total_height);
    var width = base / (grid_size + 2);
    var left = total_width + width;
    var top_step = width;
    var bit_array = [];
    var parity_bits = new Set();
    console.log(shapeContainer.childElementCount);
    if (shapeContainer.childElementCount > grid_size * grid_size) {
        for (let j = grid_size * grid_size; j < 2 * (grid_size * grid_size); j++) {
            var child = shapeContainer.childNodes[grid_size * grid_size];
            console.log(child);
            shapeContainer.removeChild(child);
        }
    }
    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            var childElement = shapeContainer.children[(j + (i * grid_size))];
            var rectangle = document.createElement("div");
            rectangle.style.width = width + "px";
            rectangle.style.height = width + "px";
            rectangle.style.left = left + "px";
            rectangle.style.top = top_step + "px";
            rectangle.classList.add("rectangle");
            rectangle.textContent = childElement.textContent;
            rectangle.style.backgroundColor = childElement.style.backgroundColor;
            bit_array.push(parseInt(childElement.textContent, 10));
            shapeContainer.appendChild(rectangle);
            left += width;
        }
        top_step += width
        left = total_width + width;
    }
    // 
    var count = 0;
    for (let i = 0; i < grid_size * grid_size; i++) {
        if (i === 0) { continue; }
        count += bit_array[i];
    }
    if (count % 2 !== bit_array[0]) {
        var childElement = shapeContainer.children[(grid_size * grid_size)];
        childElement.style.backgroundColor = "#e1675b";
    }
    // Need to check all bits to make sure
    var parity_bits = {};
    var error = new Set();
    var temp = [];
    for (let i = 0; i < bit_array.length; i++) {
        if (Math.log2(i) % 1 === 0) {
            parity_bits[i] = 0;
        }
        else {
            temp = getNumbersWithOneBit(i);
            for (let j = 0; j < temp.length; j++) {
                parity_bits[temp[j]] += bit_array[i];
            }
        }
    }
    for (var key in parity_bits) {
        if (parity_bits[key] % 2 !== bit_array[key]) {
            // Color in error row

            error.add(parseInt(key, 10));
        }
    }
    console.log(error);
    var Error_Bit = {}
    for (let i = 0; i < bit_array.length; i++) {
        // var childElement = shapeContainer.children[(grid_size * grid_size)];
        temp = getNumbersWithOneBit(i);
        console.log(temp);
        for (let j = 0; j < temp.length; j++) {
            if (error.has(temp[j])) {
                if (Error_Bit.hasOwnProperty(i + (grid_size * grid_size))) {
                    Error_Bit[i + (grid_size * grid_size)] += 1;
                }
                else {
                    Error_Bit[i + (grid_size * grid_size)] = 1;
                }
            }
        }
    }
    var maxKey = null;
    var maxValue = -Infinity;

    for (var key in Error_Bit) {
        if (Error_Bit.hasOwnProperty(key)) {
            var value = Error_Bit[key];
            if (value > maxValue) {
                maxValue = value;
                maxKey = key;
            }
        }
    }
    var childElement = shapeContainer.children[maxKey];
    childElement.style.backgroundColor = "red";
}

// var chartOptions = { defaultPoint: { outline: { color: "darken" } } };

// JSC.Chart('chartDiv', {
//     type: 'horizontal column',
//     chartArea_fill: 'transparent',
//     series: [
//         {
//             points: [
//                 { x: 'Apples', y: 50, color: "red" },
//                 { x: 'Oranges', y: 42 },

//             ]
//         }
//     ],
//     box: {
//         radius: 10,
//         fill: "#202225"
//     }
// });
// JSC.getPallette('fiveColor13')


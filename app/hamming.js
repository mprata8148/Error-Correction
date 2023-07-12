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
    console.log(parity_bits)
    for (var key in parity_bits) {
        if (parity_bits[key] % 2 !== bit_array[key]) {
            // Color in error row
            error.add(parseInt(key, 10));
        }
    }
    var Error_Bit = {}
    for (let i = 0; i < bit_array.length; i++) {
        // var childElement = shapeContainer.children[(grid_size * grid_size)];
        temp = getNumbersWithOneBit(i);
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
    if(Error_Bit[maxKey] == 1){
        maxKey--;
    }
    var childElement = shapeContainer.children[maxKey];
    childElement.style.backgroundColor = "red";
}
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
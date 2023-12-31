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
    var min = (total_height > total_width ? total_width : total_height);
    var width = min / (bit_count_number + 4);
    var height = width;
    var left_step = (total_width - (width * bit_count_number)) / 2;
    var top_step = 10;
    Bit_Array = [];
    for (let i = 0; i < bit_count_number; i++) {
        var randomNumber = Math.round(Math.random());
        Bit_Array.push(randomNumber);
    }
    while (shapeContainer.firstChild) {
        shapeContainer.removeChild(shapeContainer.firstChild);
    }
    var chart = document.getElementById("chartDiv");
    if(chart){chart.style.display = "none";}
    var textLocation = document.getElementById("polynomial");
    while(textLocation.firstChild){
        textLocation.removeChild(textLocation.firstChild);
    }
    //------------------------------------------//
    console.log("COPY COUNT: ", copy_count);
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
        left_step = (total_width - (width * bit_count_number)) / 2;
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
    var total_height = document.getElementById("content").offsetHeight;
    var total_width = document.getElementById("content").offsetWidth;
    var min = (total_height > total_width ? total_width : total_height);
    var width = min / (bit_count_number + 4);
    var height = width;
    var left_step = (total_width - (width * bit_count_number)) / 2;
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
            rectangle.style.backgroundColor = rectangleColor;
        }
        else {
            rectangle.style.backgroundColor = errorColor;
        }
        left_step += width;
        Boxes.appendChild(rectangle);
    }
}


function CreateLegendBF() {
    var Legend = document.getElementById("Legend")
    Legend.style.height = Legend.offsetHeight * .4 + "px";
    var LightGreen = "#458b53"; var LightRed = "#e1675b"; var Red = "red"; var Grey = "#868383"; var Highlight = "#9ed795";
    var width = "25%";
    while (Legend.firstChild) {
        Legend.removeChild(Legend.firstChild);
    }
    Legend.style.top = "80%"
    Legend.style.width = "30%";
    Legend.style.height = "10%";

    // Legend.style.height = Legend.offsetHeight * 4 + "px";
    Legend.appendChild(CreateParent(LightGreen, "Correct Bit", width));
    Legend.appendChild(CreateParent(LightRed, "Wrong Bit", width));
    Legend.appendChild(CreateParent(Grey, "Data Bit", width));

}
{/* <select id="dropdown" class="dropdown" onchange="updateText()">
                <option value="Brute Force">Brute Force</option>
                <option value="Hamming">Hamming</option>
                <option value="Reed Solomon">Reed Solomon</option>
            </select>
            <select id="size" class="menu_button" onchange="updateText()">
                <option value="8bits">8 bit</option>
                <option value="16bits">16 bit</option>
                <option value="20bits">20 bit</option>
            </select>
            <select id="copies" class="menu_button" onchange="updateText()">
                <option value="3copies">3 copies</option>
                <option value="4copies">4 copies</option>
                <option value="5copies">5 copies</option>
            </select>
            <div class="Run" id="Run" onclick="clickedStart(this)">
                <span class="start-text">Start</span>
            </div> */}

function create_options(parent, str,values) {
    for (let i = 0; i < 3; i++) {
        var newOption = document.createElement("option");
        newOption.textContent = str[i];
        newOption.value = values[i];
        parent.appendChild(newOption)
    }
}
function Brute_Force_Menu(menu) {
    var str = ["Brute Force","Hamming","Reed Solomon"];
    var str1 = ["8 bits","16 bits","20 bits"];
    var value1 = ["8bits","16bits","20bits"];
    var str2 = ["3 copies","4 copies","5 copies"];
    var value2 = ["3copies","4copies","5copies"];
    var Main = document.createElement("select");
    var Button1 = document.createElement("select");
    var Button2 = document.createElement("select");
    Button2.setAttribute("id", "copies");
    Button2.setAttribute("class","menu_button")
    Button2.setAttribute("onchange", "updateText()");
    Button1.setAttribute("id", "size");
    Button1.setAttribute("class","menu_button")
    Button1.setAttribute("onchange", "updateText()");
    Main.setAttribute("id" ,"dropdown");
    Main.setAttribute("class", "dropdown");
    Main.setAttribute("onchange", "updateText()");

    create_options(Main,str,str);
    create_options(Button1,str1,value1);
    create_options(Button2,str2,value2);
    menu.appendChild(Main);
    menu.appendChild(Button1);
    menu.appendChild(Button2);
}
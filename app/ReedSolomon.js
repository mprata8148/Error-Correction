function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  
function ReedSolomonSettings() {
    // Things we need
    // Bit Set size -> 3 bit, 4 bit, 8bit
    // Number of K -> 2,4,6;
    // Number Read Bits -> 4,8,12;
    // const menu = document.getElementById("Menu");
    var start_button = document.getElementById("Run");
    start_button.textContent  = "Generate Error Bits";
    button1  = document.getElementById("size");
    button2 = document.getElementById("copies");
    button1.children[0].textContent = "3 bit [0,6]";
    button1.children[1].textContent = "4 bit [0,12]";
    button1.children[2].textContent = "8 bit [0,250]";
    button1.children[0].value = "7"; 
    button1.children[1].value = "13";
    button1.children[2].value = "251";
    button2.children[0].textContent = "2 Error Bits";
    button2.children[1].textContent = "4 Error Bits";
    button2.children[2].textContent = "6 Error Bits";
    button2.children[0].value = "2";
    button2.children[1].value = "4";
    button2.children[2].value = "6";
    
}
var N_Array = [];
function ReedSolomonMain(){
    var bit_size = document.getElementById("size").value;
    var N = parseInt(bit_size.split(" ")[0], 10);
    var bit_val = document.getElementById("size");
    var selectedOption = bit_val.options[bit_val.selectedIndex];
    bit_val = parseInt(selectedOption.textContent.split(" ")[0], 10);
    var copy_count = document.getElementById("copies").value;
    var K = parseInt(copy_count.split(" ")[0], 10);
    var Boxes = document.getElementById("top_content");
    N_Array = [];
    let num_of_copies = 4;
    var total_height = document.getElementById("content").offsetHeight;
    var total_width = document.getElementById("content").offsetWidth;
    var min = total_width > total_height ? total_height : total_width;
    var width = min / (num_of_copies+4);
    var height = width;
    var left_step = (total_width - (width * num_of_copies)) / 2;
    var top_step = 10;
    while (Boxes.firstChild) {
        Boxes.removeChild(Boxes.firstChild);
    }
    for(let i = 0; i<num_of_copies; i++){
        const randomNumber = getRandomNumber(N-1);
        var rectangle = document.createElement("div");
        rectangle.style.width = width + "px";
        rectangle.style.height = height + "px";
        rectangle.style.left = left_step + "px";
        rectangle.style.top = top_step + "px";
        rectangle.classList.add("rectangle");
        // rectangle.innerText = N_Array[i];
        rectangle.innerText =  randomNumber; // positiveModulo(randomNumber,N);
        // N_Array.push(positiveModulo(randomNumber,N));
        N_Array.push(randomNumber);
        let corner_text = document.createElement("div");
        corner_text.classList.add("corner_text");
        corner_text.textContent = i;
        rectangle.appendChild(corner_text);
        // rectangle.innerText = 
        // rectangle.addEventListener("click", DropBit);
        left_step += width;
        Boxes.appendChild(rectangle);
    }
    left_step = (total_width - (width * num_of_copies)) / 2;
    top_step += width+10;
    for(let i = 0; i<K; i++){
        var rectangle = document.createElement("div");
        rectangle.style.width = width + "px";
        rectangle.style.height = height + "px";
        rectangle.style.left = left_step + "px";
        rectangle.style.backgroundColor = "#458b53";
        rectangle.style.top = top_step + "px";
        rectangle.classList.add("rectangle");
        rectangle.innerText = "X";
        let corner_text = document.createElement("div");
        corner_text.classList.add("corner_text");
        corner_text.textContent = i+num_of_copies;
        corner_text.style.zIndex = 2;
        rectangle.appendChild(corner_text);
        N_Array.push('X');
        // rectangle.innerText = 
        // rectangle.addEventListener("click", changeValue);
        left_step += width;
        Boxes.appendChild(rectangle);
    }

}


function CreateLegendRS() {
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
    Legend.appendChild(CreateParent(LightGreen, "Correction Bits", width));
    // Legend.appendChild(CreateParent(LightRed, "Wrong Bit", width));
    Legend.appendChild(CreateParent(Grey, "Data Bit", width));

}

var count = 0;
function DropBit(event,Points_Array,Correction){
    // console.log(count,Correction);
    if(count < Correction && event.target.style.backgroundColor !== "#e1675b"){
        var targetElement = event.target;
        var index = targetElement.children[0].textContent;
        var childElement = targetElement.children[0]
        targetElement.textContent = "?";
        targetElement.appendChild(childElement);
        if(Points_Array[index]!="X"){count++;}
        Points_Array[index] = "X";
        targetElement.style.backgroundColor = "#e1675b";
        // targetElement.removeEventListener("click", createHandleButtonClick(Points_Array, Correction));
    }
}
function createHandleButtonClick(Points_Array, Number_K) {
    return function(event) {
        DropBit(event, Points_Array, Number_K);
    };
}

function InteractiveBits(Boxes,Points_Array,Number_K){
    count = 0;
    // for (let i = 0; i < Boxes.childElementCount; i++) {
    //     Boxes.children[i] = removeAllEventListeners(Boxes.children[i]);
    //   }
    
    for(let i=0;i<Boxes.childElementCount;i++){
        if (!Boxes.children[i].onclick) {
            Boxes.children[i].addEventListener("click", createHandleButtonClick(Points_Array, Number_K));
            // Boxes.children[i].removeEventListener("click", createHandleButtonClick(Points_Array, Number_K),true);
        }
    }
}

function resetColor(Boxes,Number_K){
    var grey = "#868383";
    var lightGreen = "#458b53";
    for(let i = 0; i<Boxes.childElementCount;i++){
        Boxes.children[i].style.backgroundColor = (i<Boxes.childElementCount-Number_K?grey:lightGreen);
    }
}

function pointEvent(e){
    var LightPurple = " #5865F2";
    var Boxes = document.getElementById("top_content");
    index = this.y[0];
    if(index >= 0 && index < Boxes.childElementCount){Boxes.children[index].style.backgroundColor = LightPurple; }
      
}
function hoverOffEvent(e){
    var LightGreen = "#458b53"; var LightRed = "#e1675b"; var Red = "red"; var Grey = "#868383";
    var Boxes = document.getElementById("top_content");
    var copy_count = document.getElementById("copies").value;
    var K = parseInt(copy_count.split(" ")[0], 10);
    index = this.y[0];
    if(index >= 0 && index < Boxes.childElementCount){
        Boxes.children[index].style.backgroundColor = (Boxes.childElementCount-copy_count-1>=index?Grey:LightGreen);
    }
      
}
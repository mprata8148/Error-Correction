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
    button1.children[0].textContent = "3 bit [0,7]";
    button1.children[1].textContent = "4 bit [0,15]";
    button1.children[2].textContent = "8 bit [0,255]";
    button1.children[0].value = "3";
    button1.children[1].value = "4";
    button1.children[2].value = "8";
    button2.children[0].textContent = "2 Error Bits";
    button2.children[1].textContent = "4 Error Bits";
    button2.children[2].textContent = "6 Error Bits";
    button2.children[0].value = "2";
    button2.children[1].value = "4";
    button2.children[2].value = "6";
    
}

function ReedSolomonMain(){
    var bit_size = document.getElementById("size").value;
    var N = parseInt(bit_size.split(" ")[0], 10);
    var copy_count = document.getElementById("copies").value;
    var K = parseInt(copy_count.split(" ")[0], 10);
    var Boxes = document.getElementById("top_content");
    var N_Array = [6,4,1,4];
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
    for(let i = 0; i<4; i++){
        const randomNumber = getRandomNumber(Math.pow(2,N)-1);
        var rectangle = document.createElement("div");
        rectangle.style.width = width + "px";
        rectangle.style.height = height + "px";
        rectangle.style.left = left_step + "px";
        rectangle.style.top = top_step + "px";
        rectangle.classList.add("rectangle");
        rectangle.innerText = N_Array[i];
        // rectangle.innerText = randomNumber%7;
        // N_Array.push(randomNumber%7);
        let corner_text = document.createElement("div");
        corner_text.classList.add("corner_text");
        corner_text.textContent = i;
        rectangle.appendChild(corner_text);
        // rectangle.innerText = 
        // rectangle.addEventListener("click", changeValue);
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
        corner_text.textContent = i+num_of_copies+1;
        rectangle.appendChild(corner_text);
        // rectangle.innerText = 
        // rectangle.addEventListener("click", changeValue);
        left_step += width;
        Boxes.appendChild(rectangle);
    }
    Lagrange_Interpolation(N_Array,K);

}
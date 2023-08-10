
class QRCode {
    constructor(size, property2) {
      this.size = size;
      this.property2 = property2;
      this.data = [];
      this.marker = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1]];
      for(let j = 0;j<size;j++){
        let row = [];
        for(let i = 0;i<size;i++){
            row.push(-1);
        }
        this.data.push(row);
        row = [];
      }
    }
  
    generateQR() {
      // Define a method
      console.log("DATA");
    }
    allignmentPattern(){
        for(let i = 0;i<this.size;i++){
            switch(i){
                case
            }
        }
    }
  
    method2() {
      // Define another method
      console.log("Method 2 called");
    }
  }
// QR CODE logic 
// A:0,6,14,20
// B:1,5,15,19
// C:2,3,4,16,17,18

  

function generateQRPage(){
    //Delete Everything ON the screen
    ClearScreen();
    //Create TextBox Location
    var TopZone = document.getElementById("top_content");
    var TextZone = document.createElement("div");
    var QRCodeZone = document.createElement("div");
    QRCodeZone.classList.add("QRCodeBox");
    TextZone.style.width = "70%";
    TextZone.style.height = "30px";
    TextZone.style.top = "10px";
    TextZone.style.left = "15%";
    TextZone.style.background = backgroundRight;
    TextZone.style.borderRadius = "30px"
    TextZone.classList.add("rectangle");
    const textBox = document.createElement("input");
    textBox.style.background = transparent;
    textBox.type = "text"; // Set the input type to "text"
    textBox.placeholder = "Enter your text";
    textBox.style.width = "95%";
    QRCodeZone.style.background = "white";
    var total_height = document.getElementById("content").offsetHeight;
    var total_width = document.getElementById("content").offsetWidth;
    var base = (total_height/3 > total_width/3 ?  total_width/3 : total_height/3 );
    
    QRCodeZone.style.width = base+"px";
    QRCodeZone.style.height =  base+"px";
    QRCodeZone.style.left =  total_width/2-base/2+"px";
    
    
    console.log(QRCodeZone.style.left);
    TopZone.appendChild(QRCodeZone);
    TextZone.appendChild(textBox);
    TopZone.appendChild(TextZone);

    
    
}
function ClearScreen(){
    var Boxes = document.getElementById("top_content");
    DeleteAllChildren(Boxes);
    var polynomial = document.getElementById("polynomial");
    DeleteAllChildren(polynomial);
    var chart = document.getElementById("chartDiv");
    if(chart){chart.style.display = "none";}
}
function DeleteAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}



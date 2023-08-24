
class QRCode {
    constructor(size, property2) {
      this.size = size;
      this.property2 = property2;
      this.data = [];
      this.marker = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1]];
      this.errorPercent = {"L":[0,1],"M":[0,0],"Q":[1,0],"H":[1,1]};
      for(let j = 0;j<size;j++){
        let row = [];
        for(let i = 0;i<size;i++){
            row.push(-1);
        }
        this.data.push(row);
        row = [];
      }
      this.allignmentPattern();
      this.errorCorrection("L");
    }
  
    generateQR(parent) {
      // Define a method
      var width = parent.offsetWidth;
      var length = parent.offsetHeight;
      var cellSize = width / (this.size + 4);
      var left = cellSize * 2;
      var top = cellSize * 2;
      for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
              let cell = document.createElement("div");
              cell.className = "qrCell";
              cell.style.left = left + "px";
              left += cellSize;
              cell.style.top = top + "px";
              cell.style.width = cellSize + "px"; // Add "px" unit
              cell.style.height = cellSize + "px"; // Add "px" unit
              cell.style.background = this.data[i][j] === 1 ? "black" : "white";
              cell.style.background = this.data[i][j] === -1 ? "grey":cell.style.background;
              parent.appendChild(cell);
              
          }
          left = cellSize * 2;
          top += cellSize;
      }
    }
    allignmentPatternHelper(i,mark,top){
        if(top){
            for (let bit = 0; bit < this.marker[mark].length; bit++) {
                this.data[i][bit] = this.marker[mark][bit];
                this.data[i][this.data[i].length - bit - 1] = this.marker[mark][bit];
            }  
        }
        else{
            for (let bit = 0; bit < this.marker[mark].length; bit++) {
                this.data[i][bit] = this.marker[mark][bit];
            }
        }
    }
    allignmentPattern() {
        for (let i = 0; i < this.size; i++) {
            if (i === 0 || i === 6) {
                this.allignmentPatternHelper(i,0,true);
            }
            else if (i === 14 || i === 20) {
                this.allignmentPatternHelper(i,0,false);
            }
            else if (i === 1 || i === 5) {
                this.allignmentPatternHelper(i,1,true);
            }
            else if (i === 15 || i === 19) {
                this.allignmentPatternHelper(i,1,false);
            }
            else if(i===2||i===3||i===4){
                this.allignmentPatternHelper(i,2,true);
            }
            else if(i>=16&&i<=18){
                this.allignmentPatternHelper(i,2,false);
            }
        }
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                for(let xShift=-1;xShift<2;xShift++){
                    for(let yShift=-1;yShift<2;yShift++){
                        if(xShift===0&&yShift===0){continue;}
                        if((i+xShift<this.size && i+xShift>=0)&&(j+yShift<this.size && j+yShift>=0)){
                            if(this.data[i+xShift][j+yShift]===1&&this.data[i][j]===-1){this.data[i][j] = 0;}
                        }
                    }
                }
            }
        }
        
    }
  
    errorCorrection(percent){
      // Define another method
      for(let i =0; i<2; i++){
        this.data[8][i] = this.errorPercent[percent][i];
        this.data[this.size-1-i][8] = this.errorPercent[percent][i];;
      }
      let i = 0;
      let value = 1;
      while(this.data[6][8+i]===-1){
        this.data[6][8+i]=value;
        this.data[8+i][6]=value
        value = (value===1?0:1);
        i++;
      }
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
    
    

    TopZone.appendChild(QRCodeZone);
    TextZone.appendChild(textBox);
    TopZone.appendChild(TextZone);

    var QRCODE = new QRCode(21,"bit");
    QRCODE.generateQR(QRCodeZone);
    
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



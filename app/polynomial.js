function generatePolynomial(index,Points_Array,coeffecient){
    var key_coeffecient = {};
    let str = ""
    let temp = 1;

    for(let j = 0; j<Points_Array.length;j++){
        if(j === index || Points_Array[j] === 'X' || Points_Array === null){continue;}
        str+="(x - " + j + ")*";
        temp*=(index-j);
    }
    let fraction = "("+Points_Array[index]+"/"+temp+")*";
    str += fraction;
    return str;
}
function Lagrange_Interpolation(Points_Array){
    var IndexFix =[];
    var coeffecient ={};
    var polynomials = [];
    var bit_size = document.getElementById("size").value;
    var N = parseInt(bit_size.split(" ")[0], 10);
    var copy_count = document.getElementById("copies").value;
    var Number_K = parseInt(copy_count.split(" ")[0], 10);
    var Boxes = document.getElementById("top_content");
    for(let i = 0;i<Number_K;i++){
        coeffecient[i+Points_Array.length] = [];
    }
    let Count = 0;
    for(let i = 0; i<Points_Array.length;i++){
        // || Count < Points_Array.length - N
        if(Points_Array[i]!='X'){
            Count++;
            polynomials.push(generatePolynomial(i,Points_Array,coeffecient).slice(0, -1));}
        else{
            IndexFix.push(i);
        }
    }
    var final_polynomial = "";
    for(var i = 0; i<polynomials.length;i++){
        final_polynomial+=(i === polynomials.length-1?polynomials[i]:polynomials[i]+"+");
    }
    console.log(final_polynomial);
    // (x - 1)*(x - 2)*(x - 3)*(4/-6)+
    //(x - 0)*(x - 2)*(x - 3)*(1/2)+
    //(x - 0)*(x - 1)*(x - 3)*(7/-2)+
    //(x - 0)*(x - 1)*(x - 2)*(3/6)
    var values = [];
    values =final_polynomial.split(")+(").map((foil) => {
        // console.log(foil)
        return arrayForm(foil)
    });
    var additiveValues = [];
    console.log(values);
    values.forEach((valueArray) => {
        // console.log(valueArray)
        valueArray.forEach((a, i) => {
            // console.log("value", a)
            // console.log("index", i)
            additiveValues[i] = (additiveValues[i] || 0) + a;
            console.log(additiveValues[i] );
        });
    })
    // console.log(additiveValues);

    var poly_text = document.getElementById("polynomial");
    poly_text.textContent = polyStringFormat(additiveValues);
    for(let i = 0; i<IndexFix.length;i++){
        let value = Math.round(evaluateFunction(final_polynomial,IndexFix[i]));
        // value = positiveModulo(value,N);
        Points_Array[IndexFix[i]]=value;
        Boxes.children[IndexFix[i]].textContent = value;
        let corner_text = document.createElement("div");
        corner_text.classList.add("corner_text");
        corner_text.textContent = IndexFix[i];
        Boxes.children[IndexFix[i]].appendChild(corner_text);
    }
    resetColor(Boxes,Number_K);
    generateGraph(final_polynomial,-1,Points_Array.length);
    InteractiveBits(Boxes,Points_Array,Number_K);
}
function evaluateFunction(func, x) {
    const terms = func.split('+');
    let result = 0;
    
    for (const term of terms) {
      let value = 1;
      const factors = term.split('*');
      
      for (const factor of factors) {
        const parts = factor.split('(');
        const constant = parseFloat(parts[0]) || 1;
        const expression = parts[1].split(')')[0];
        
        if (expression === 'x') {
          value *= x;
        } else {
          const evaluated = eval(expression);
          value *= evaluated;
        }
      }
      
      result += value;
    }
    
    return result;
  }

function generateGraph(func,min,max,N) {
    var get_element = document.getElementById("GraphLocation");
    var pointsArray = [];
    for(let x = min;x<=max; x+=.25){
        pointsArray.push([x,evaluateFunction(func,x)]);
    }
    const Chart = new JSC.Chart('chartDiv', {
        type: 'line',
        title: {
            label_text: "Lagrange Interpolation",
            // label_font_color: "red"
        },
        // chartArea_fill: 'transparent',
        series: [{
            name: "Generated",
            type: 'line',
            // defaultTick_interval: 1,
            points: pointsArray,
            defaultPoint_marker_visible: false,
            // xValues: '*',
            // xValues: JSC.range(-10, 10),
            animation: {duration:1000, easing:"easeInQuad"},
            color: "red",
          }],
        box: {
            radius: 10,
            // fill: "#202225"
        },
        options: {
            responsive: true,
        },
        
    });
  }

  String.prototype.removeSecondSpace = function () {
    const firstSpaceIndex = this.indexOf(' ');
    if (firstSpaceIndex === -1) {
      return this; // Return the input as it is if there's no space
    }
    const secondSpaceIndex = this.indexOf(' ', firstSpaceIndex + 1);
    if (secondSpaceIndex === -1) {
      return this; // Return the input as it is if there's only one space
    }
    return this.substring(0, secondSpaceIndex) + this.substring(secondSpaceIndex + 1); // Remove the second space
  };
  
  // Example usage
  function multiply(a1, a2) {
      var result = [];
    //   console.log(a1,a2)
      a1.forEach(function (a, i) {
          a2.forEach(function (b, j) {
              result[i + j] = (result[i + j] || 0) + a * b;
          });
      });
      return result;
  }
  
  
  
  function arrayForm(expression){
    var termsArray = expression.split("*");
    
    for(let i = 0; i<termsArray.length;i++){
      var temp = termsArray[i].replaceAll("(", "").replaceAll(")","");
      temp = temp.removeSecondSpace();
      termsArray[i] = temp.split(" ");
      for(let terms in termsArray[i]){
          termsArray[i][terms] = (termsArray[i][terms] === "x"?1: parseFloat(eval(termsArray[i][terms]),10));
      }
      termsArray[i].reverse();
      // if(termsArray[i].length === 1){
      //     termsArray[i].push(0);
      // }
    }
    // (x - 1)*(x - 2)*(x - 3)*(4/-6)+(x - 0)*(x - 2)*(x - 3)*(1/2)+(x - 0)*(x - 1)*(x - 3)*(7/-2)+(x - 0)*(x - 1)*(x - 2)*(3/6)
    // console.log(termsArray);
    var ans = termsArray.reduce(multiply);
    ans = ans.map((num) =>{
        // return Number(element.toFixed(3));
        return Math.round(num*100 + 0.1**(17-2-(Math.round(num*100)/100).toString().length))/100
    })
    console.log(ans);
    return ans
  }

  function polyStringFormat(additiveValues){
    let polyString = additiveValues[0]+"+";
    for(let i = 1;i<additiveValues.length;i++){
        polyString+=(i===0?additiveValues[i]:additiveValues[i]+"x^"+i+"+");
    }
    // console.log(polyString);
    polyString = polyString.slice(0, -1);
    return polyString;
  }
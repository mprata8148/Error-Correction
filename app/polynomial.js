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
    var chart = document.getElementById("chartDiv");
    if(chart){
        chart.style.display = "block";
    }
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
    values.forEach((valueArray) => {
        // console.log(valueArray)
        valueArray.forEach((a, i) => {
        
            additiveValues[i] = simplify([fractAdding(a,(additiveValues[i] || "0"))])[0];
            // (additiveValues[i] || 0) + a;
        });
    })
    console.log("Additive Values: ",polyStringFormat(additiveValues));
    var Lagrange_Poly = polyStringFormat(additiveValues);
    var modPoly = polyStringFormat(polynomialModulation(additiveValues,N));
    var polyText =  document.getElementById("polynomial");
    while (polyText.firstChild) {
        polyText.removeChild(polyText.firstChild);
    }
    var LagrangePoly = document.createTextNode("Lagrange: "+Lagrange_Poly);
    var lineBreak1 = document.createElement("br");
    var modPolyStr = document.createTextNode("Mod Arithmatic Poly: "+ modPoly);
    polyText.appendChild(LagrangePoly);
    polyText.appendChild(lineBreak1);
    polyText.appendChild( modPolyStr);
    // poly_text.textContent = polyStringFormat(additiveValues);
    for(let i = 0; i<IndexFix.length;i++){
        let value = Math.round(evaluatePolynomial(modPoly,IndexFix[i],N));
        // value = positiveModulo(value,N);
        Points_Array[IndexFix[i]]=value;
        Boxes.children[IndexFix[i]].textContent = value;
        let corner_text = document.createElement("div");
        corner_text.classList.add("corner_text");
        corner_text.textContent = IndexFix[i];
        Boxes.children[IndexFix[i]].appendChild(corner_text);
    }
    resetColor(Boxes,Number_K);
    generateGraph(final_polynomial,modPoly,-1,Points_Array.length,N);
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
    // return result;
  }

function generateGraph(lagrange,modLagrange,min,max,N) {
    var get_element = document.getElementById("GraphLocation");
    var pointsArray = [];
    var pointsMod = [];
    var criticalPoints = [];
    var Boxes = document.getElementById("top_content");
    console.log("POLY: ",modLagrange,"Mod: ",N);
    for(let x = min;x<=max; x+=.25){
        pointsArray.push([x,evaluateFunction(lagrange,x)]);
        pointsMod.push([x,evaluatePolynomial(modLagrange,x,N)]);
        if(Number.isInteger(x)&& x>=0 &&Boxes.childElementCount > x){criticalPoints.push([x,pointsMod[pointsMod.length-1]]);}
    }
    console.log(pointsMod);
    const Chart = new JSC.Chart('chartDiv', {
        type: 'line',
        title: {
            label_text: "Lagrange Interpolation",
            // label_font_color: "red"
        },
        // chartArea_fill: 'transparent',
        series: [{
            name: "Lagrange",
            type: 'line',
            // defaultTick_interval: 1,
            points: pointsArray,
            defaultPoint_marker_visible: false,
            // xValues: '*',
            // xValues: JSC.range(-10, 10),
            animation: {duration:1000, easing:"easeInQuad"},
            color: "red",
          },
          {
            name: "Mod",
            type: 'line',
            points: pointsMod,
            defaultPoint_marker_visible: false,
            animation: {duration:1000, easing:"easeInQuad"},
            color: "blue",
           
          },{
            name: "Critical Points",
            type: 'marker',
            // visible: false,
            points: criticalPoints,
            lineWidth: 0, // Set the lineWidth to 0 to hide lines
            step: true,
            lineWidth: 0, // Set the lineWidth to 0 to prevent lines

            // defaultPoint_marker_visible: false,
            defaultPoint: { 
                opacity: 0.8, 
                marker: { 
                  type: 'circle', 
                  outline_width: 0, 
                  size: 10
                },
                events_mouseOver: pointEvent,
                events_mouseOut: hoverOffEvent
              },

            animation: {duration:1000, easing:"easeInQuad"},
            color: "green",
          }
        ],
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
function multiply(a1, a2) {
      var result = [];
      a1.forEach(function (a, i) {
          a2.forEach(function (b, j) {
            // a=a.toString();
            // b=b.toString();

            var prod;
            prod = (a.includes("/")||b.includes("/")?fractMult(a,b):(parseInt(a)*parseInt(b)).toString());

            result[i+j] = ((result[i + j]&&result[i + j].includes("/"))||(prod.includes("/")))?fractAdding((result[i + j] || "0"),prod):(parseInt(result[i+j]||"0")+parseInt(prod)).toString();
            // result[i + j] = (result[i + j] || 0) + a * b;
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
          termsArray[i][terms] = (termsArray[i][terms] === "x"?"1": termsArray[i][terms]);
      }
      termsArray[i].reverse();
      // if(termsArray[i].length === 1){
      //     termsArray[i].push(0);
      // }
    }
    // (x - 1)*(x - 2)*(x - 3)*(4/-6)+(x - 0)*(x - 2)*(x - 3)*(1/2)+(x - 0)*(x - 1)*(x - 3)*(7/-2)+(x - 0)*(x - 1)*(x - 2)*(3/6)
    var ans = termsArray.reduce(multiply);
    ans = simplify(ans);
    return ans
  }

  function polyStringFormat(additiveValues){
    let polyString = (additiveValues[0]==="0"?"":additiveValues[0]+"+");
    for(let i = 1;i<additiveValues.length;i++){
        polyString+=(additiveValues[i]==="0"?"":additiveValues[i]+"x^"+i+"+");
    }
    polyString = polyString.slice(0, -1);
    return polyString;
  }

function fractMult(a,b){
    fraction = [];
    a_num = FractionalSplit(a);
    b_num = FractionalSplit(b);
    fraction[0] = a_num[0]*b_num[0];
    fraction[1] = (a_num[1]?a_num[1]:1)*(b_num[1]?b_num[1]:1);
    // Both Negative Case:
    if(fraction[1]<0){
        fraction[1] = -fraction[1];
        fraction[0] = -fraction[0];
    }
    return fraction[0]+"/"+fraction[1];
}
function fractAdding(a,b){
    a_num = FractionalSplit(a);
    b_num = FractionalSplit(b);
    leastCommonMult = lcm((a_num[1]||1),(b_num[1]||1));
    a_mult = leastCommonMult/(a_num[1]?a_num[1]:1);
    b_mult = leastCommonMult/(b_num[1]?b_num[1]:1);
    answer = [];
    answer[0] = a_mult*a_num[0]+b_mult*b_num[0];
    answer[1] = leastCommonMult;
    return answer[0] + "/" + answer[1];
}
function FractionalSplit(fractionString){
    var numList = [];
    if(fractionString.includes("/")){
        let [numerator, denominator] = fractionString.split('/');
        numList.push(parseInt(numerator));
        numList.push(parseInt(denominator));
    }
    else{numList.push(parseInt(fractionString,10));}
    return numList;
}

function gcd(a, b) {
    // Ensure a is greater than or equal to b
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
  function lcm(a,b){
    return Math.abs(a*b)/gcd(a,b);
  }
 function simplify(ans){
     for(let i =0;i<ans.length;i++){
         if(ans[i].includes("/")){
             let fraction = FractionalSplit(ans[i])
             let greatestComDiv = gcd(parseInt(fraction[0],10),parseInt(fraction[1],10));
            //  fraction[0]/=greatedComDiv;
            //  fraction[1]/=greatedComDiv;
            fraction[0]/=greatestComDiv;
            fraction[1]/=greatestComDiv;
            if(fraction[1]<0){
                fraction[1] = -fraction[1];
                fraction[0] = -fraction[0];
            }
            ans[i] = (fraction[1]===1?fraction[0]+"":fraction[0]+"/"+fraction[1]);
         }
     }
     return ans;
 }

  function evaluateFraction(fractionString,sign) {
    var [numerator, denominator] = fractionString.split('/').map(Number);
  
    numerator = (sign?-numerator:numerator);
    return denominator === undefined ? numerator : numerator / denominator;
  }
  
  function evaluatePolynomial(polynomialString, x,mod) {
    const terms = polynomialString.split(/(?=[+-])/).map((term) => term.trim());
    let result = 0;
    for (const term of terms) {
      const regex = /([+-]?\d+(?:\/\d+)?)?x\^(\d+)/;
      if(term === "+" || term === "-"){continue;}
      const [,coefficient, exponent] = term.match(regex) || [];
      var sign = term.includes("-");
      const coeff = coefficient ? evaluateFraction(coefficient,sign) : 1;
      const exp = parseInt(exponent, 10);
      result += (term.includes("x")?coeff * Math.pow(x, exp||0):evaluateFraction(term,sign))
      
    }

    
    return positiveModulo(result,mod);
  }
  
  
  
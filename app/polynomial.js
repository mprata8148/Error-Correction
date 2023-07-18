function generatePolynomial(index,Points_Array,coeffecient){
    var key_coeffecient = {};
    for(let key in coeffecient){
        key_coeffecient[key] = [];
    }
    let str = ""
    let temp = 1;
    for(let j = 0; j<Points_Array.length;j++){
        if(j === index){continue;}
        str+="(x - " + j + ")*";
        // console.log(str);
        for(let key in key_coeffecient){
            key_coeffecient[key].push(key - j);
        }
        temp*=(index-j);
        
    }
    let fraction = "("+Points_Array[index]+"/"+temp+")*";
    str += fraction;
    for(let key in key_coeffecient){
        let ans = 1;
        for(let i =0; i< key_coeffecient[key].length;i++){
            ans*=key_coeffecient[key][i];
        }
        ans=Math.round(ans*Points_Array[index]*(1/temp));
        coeffecient[key].push(ans);
    }

    return str;
}
function Lagrange_Interpolation(Points_Array,Number_K){
    var coeffecient ={};
    var polynomials = [];
    var Boxes = document.getElementById("top_content");
    for(let i = 0;i<Number_K;i++){
        coeffecient[i+Points_Array.length] = [];
    }
    for(let i = 0; i<Points_Array.length;i++){
        polynomials.push(generatePolynomial(i,Points_Array,coeffecient).slice(0, -1))
    }
    console.log(coeffecient);
    for(key in coeffecient){
        let temp = 0;
        for(let i = 0; i<coeffecient[key].length;i++){
            temp+=coeffecient[key][i];
        }
        Boxes.children[key].textContent = temp%7;
    }
    var final_polynomial = "";
    for(var i = 0; i<polynomials.length;i++){
        final_polynomial+=(i === polynomials.length-1?polynomials[i]:polynomials[i]+"+");
    }
    console.log(final_polynomial);

    generateGraph(final_polynomial);
}
function evaluateFunction(func, start, end) {
    const answer = [];
    
    for (let x = start; x <= end; x+=.25) {
      let result = 0;
      const terms = func.split('+');
      
      for (const term of terms) {
        let value = 1;
        const factors = term.split('*');
        
        for (const factor of factors) {
          const parts = factor.split('(');
          const constant = parseFloat(parts[0]) || 1;
          const expression = parts[1].split(')')[0];
          const evaluated = eval(expression);
          value *= evaluated;
        }
        
        result += value;
      }
      
      answer.push([x, result]);
      result = 0;
      value = 1;
    }
    
    return answer;
  }

function generateGraph(func) {
    var get_element = document.getElementById("GraphLocation");
    // var chartOptions = { defaultPoint: { outline: { color: "darken" } } };
    console.log(func)
    var pointsArray =evaluateFunction(func,-2,5);
    const Chart = new JSC.Chart('chartDiv', {
        type: 'line',
        title: {
            label_text: "Lagrange Interpolation",
            // label_font_color: "red"
        },
        // chartArea_fill: 'transparent',
        series: [{
            type: 'line',
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
    // chart = JSC.Chart('chartDiv', {
    //     type: 'line',
    //     series: [
    //       {
    //         points: Array.from({ length: 21 }, (_, i) => [i - 10, Math.pow(i - 10, 2)]),
    //       }
    //     ]
    //   });
    // JSC.getPallette('fiveColor13')
  }
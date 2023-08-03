function positiveModulo(n, m) {
    return ((n % m) + m) % m;
  }

function modInverse(a, m)
  {
      let g = gcd(a,m);
      if (g != 1)
          document.write("Inverse doesn't exist");
      else
      {
          // If a and m are relatively prime, then modulo
          // inverse is a^(m-2) mode m
          return power(a, m - 2, m);
      }
  }
   
  // To compute x^y under modulo m
  function power(x, y, m)
  {
      if (y == 0)
          return 1;
      let p = power(x, parseInt(y / 2), m) % m;
      p = (p * p) % m;
   
      return (y % 2 == 0) ? p : (x * p) % m;
  }

  function polynomialModulation(polyTerms,mod){
    for(let i = 0;i<polyTerms.length;i++){
        let term = polyTerms[i];
        if(term.includes("/")){
            fraction = term.split("/");
            fraction[0] = positiveModulo(parseInt(fraction[0]),mod);
            fraction[1] = modInverse(parseInt(fraction[1]),mod);
            polyTerms[i] = positiveModulo(fraction[0]*fraction[1],mod).toString();
        }
        else{
            polyTerms[i] = positiveModulo(parseInt(term),mod);
        }
    }
    return polyTerms;
  }
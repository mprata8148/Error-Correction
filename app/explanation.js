function closeEXP(){
    var window = document.getElementById("expWindow");
    // var TextZone = document.getElementById("TZ");
    if(window.style.display === "block"){
        window.style.display = "none"
    }
}
function bruteForceExp(){
    var window = document.getElementById("expWindow");
    var TextZone = document.getElementById("TZ");
    if(window.style.display === "" || window.style.display === "none"){
        window.style.display = "block"
    }
    while(TextZone.firstChild){
        TextZone.removeChild(TextZone.firstChild);
    }
    var createTitle = document.createElement('h2');
    createTitle.textContent = "Brute Force";
    var createPar = document.createElement('p');
    createPar.textContent = "For the Brute Force method, when storing memory we simply write an exact copy of the memory and take the mojority of the bit The down side of this method is the sheer amount of memory needed is M (number of copies) times K (number of bits)";
    // <h2>Brute Force</h2>
    TextZone.appendChild(createTitle);
    TextZone.appendChild(createPar);           
}
function appendChildren(parent,list){
    for(let i = 0;i<list.length;i++){
        parent.appendChild(list[i]);
    }
}
function createSlide(){
    var slide = document.createElement("div");
    slide.className = "Slide";
    return slide;
}
function createImage(imagePath,TextZone){
    var sideLen = (TextZone.offsetHeight>TextZone.offsetWidth?TextZone.offsetWidth:TextZone.offsetHeight);
    var imgvar = document.createElement("img");
    imgvar.className = "SlideImg";
    imgvar.src = imagePath;
    imgvar.style.width = sideLen*.3 +"px";
    imgvar.style.height = sideLen*.3+"px";
    imgvar.style.left = TextZone.offsetWidth/2 - sideLen/2*.3 + "px";
    imgvar.style.position = "absolute";
    return imgvar;
}
function slideText(slide,title,par){
    var Title = document.createElement("h1");
    Title.textContent = title;
    var Par = document.createElement("p");
    Par.textContent = par;
    var textSection = document.createElement("div");
    textSection.className = "slideText";
    // Title.style.marginTop = 100 + "px";
    textSection.appendChild(Title);
    textSection.appendChild(Par); 
    slide.appendChild(textSection);
    // console.log(slide);

}
function hammingExp(){
    var window = document.getElementById("expWindow");
    var TextZone = document.getElementById("TZ");
    while(TextZone.firstChild){
        TextZone.removeChild(TextZone.firstChild);
    }
    if(window.style.display === "" || window.style.display === "none"){
        window.style.display = "block"
    }
    //Create the Slides 
    var left_arrow = document.createElement('a');
    var right_arrow = document.createElement('a');
    left_arrow.className = "prev";
    right_arrow.className = "next";
    left_arrow.textContent = '\u276E';
    right_arrow.textContent = '\u276F';
    var slide1 = createSlide();
    slide1.appendChild(createImage("./app/photos/HammingPhotos/mainParityBit.jpg",TextZone));
    let slide1Title = "Main Parity Bit";
    let sText = "This bit counts the total amount of 1's. If there is an odd amount it will be 1 and 0 otherwise. We use this to see if 1 error has occurred.";
    slideText(slide1, slide1Title,sText);
    TextZone.appendChild(slide1);
    TextZone.appendChild(left_arrow);
    TextZone.appendChild(right_arrow);
}
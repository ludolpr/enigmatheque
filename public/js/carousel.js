let i = 0;  //  current slide
let j = 4; //  total slide


// console.log("1", i);
// console.log("2", j);

const dots = document.querySelectorAll(".dotContainer button");
// console.log(dots);
const images = document.querySelectorAll(".image-container img");

function suiv(){
    document.getElementById("content" + (i+1)).
    classList.remove("active");
    i = ( j + i + 1) % j;
    document.getElementById("content" + (i+1)).
    classList.add("active");
    indicator( i + 1 );
}
function prec(){
    document.getElementById("content" + (i+1)).
    classList.remove("active");
    // 0 = ( 3 + 0 - 1) modulo de 3
    i = ( j + i - 1) % j;
    document.getElementById("content" + (i+1)).
    classList.add("active");
    indicator(i + 1);
}
function indicator(num){
    dots.forEach(function(dot){ 
        dot.style.backgroundColor = "transparent";        
    });
    document.querySelector(".dotContainer button:nth-child(" + num + ")").style.backgroundColor = "#212121";
}

function dot(index){
    images.forEach(function(image){
        image.classList.remove("active");
        console.log(dots);
    });
    document.getElementById("content" + index).classList.
    add("active");
    i= index - 1 ;
    indicator(index);
}

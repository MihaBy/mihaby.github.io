
function getClick() {

    document.getElementById("button-div-2").style.display="none";
    document.getElementById("button-div-3").style.display="none";
    document.getElementById("button-div-4").style.display="none";
    document.getElementById("button-div-5").style.display="none";
    document.getElementById("button-div-6").style.display="none";
    document.getElementById("button-div-7").style.display="none";

var b = document.getElementsByClassName("k1");

    for (var i = 0; i < b.length; i++) {
    b[i].addEventListener("click", myScript);
    }
}
 var myScript = function() {
    let getLink = this.getAttribute("href");
    if (getLink == "#button-div-1") {
        console.log("click on #button-div-1");
        document.getElementById("button-div-1").style.display="block";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="none";
    }
    else if (getLink == "#button-div-2") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="block";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="none";  
    }
    else if (getLink == "#button-div-3") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="block";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="none";  
    }
    else if (getLink == "#button-div-4") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="block";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="none"; 
    }    
     else if (getLink == "#button-div-5") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="block";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="none"; 
    } 
    else if (getLink == "#button-div-6") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="block";
        document.getElementById("button-div-7").style.display="none"; 
    } 
    else if (getLink == "#button-div-7") {
        document.getElementById("button-div-1").style.display="none";
        document.getElementById("button-div-2").style.display="none";
        document.getElementById("button-div-3").style.display="none";
        document.getElementById("button-div-4").style.display="none";
        document.getElementById("button-div-5").style.display="none";
        document.getElementById("button-div-6").style.display="none";
        document.getElementById("button-div-7").style.display="block"; 
    } 
    else   
      this.innerHTML = getLink;
}

window.onload = getClick;

function cl(log) {
    return console.log(log);
}


function getChild() {
    let listClass= document.getElementsByClassName("header-nav"); 
    var c;  // tag:nav item
    var d;  // tag:ul    
    var e;  // tag:li

    


    for (var i = 0; i < listClass.length; i++) {
        c = listClass[i];

        if(c.tagName == "NAV") {

            for (var j = 0; j <  c.children.length; j++) {
                d = c.children[j];

                if(d.tagName =="UL"  ) {
                    for (var k = 0; k < d.children.length; k++ ) {
                        e = d.children[k];
                        e.classList.add("nav-item-checkbox");
                    }
                }
            }
        }
    } 

    getEventClick();
    hideSect();

}

window.onload = getChild;



function getEventClick() {
    var getClass;
    getClass = document.getElementsByClassName("nav-item-checkbox");
    for (var i = 0; i < getClass.length; i++) {
        getClass[i].addEventListener("click", changeSection);

    }
}


function changeSection() {
    let getCls;
    let getA;
    let getANumb;
    let concatStr;
    let nameSect;
    let hideSect;
    getCls = this.children;
    for (var i = 0; i < getCls.length; i++ ) {
        if (getCls[i].tagName == "A" ) {
            getA = getCls[i].getAttribute("href");

            getANumb = getA.charAt(getA.length-1);
            //cl(getANumb);   
            concatStr = "wrapper__demo_";
            //cl("concatStr.concat(getANumb.toString())");
            //cl(concatStr.concat(getANumb.toString()));
            nameSect = concatStr.concat(getANumb.toString());
            hideSect = document.getElementsByClassName("wrapper");
            for(var i = 0; i < hideSect.length; i++) {
                hideSect[i].style.display ="none"
            }
            document.getElementsByClassName(nameSect)[0].style.display = "flex";
 
        }

    }

}

function hideSect() {  
    let CollectionSect = document.getElementsByClassName("wrapper");
    for (var i = 1; i < CollectionSect.length; i++) {
        CollectionSect[i].style.display = "none";
    }

}








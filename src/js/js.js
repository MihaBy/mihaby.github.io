
const vivusIcon =  new Vivus(
    'bg__svg',
    { type: 'delayed',
      //type: 'scenario',
      duration: 300,
      delay: 280,
      animTimingFunction: Vivus.EASE
    },
    
  );

  document.addEventListener("DOMContentLoaded", () => {
    let pointDiv = document.querySelector('.point_white').children;
    for (let i =0; i<pointDiv.length; i++ ) {
      pointDiv[i].style.animationDelay = getRandomInt(0, 20) * 100 +"ms";
      pointDiv[i].style.animationDuration = getRandomInt(8, 12) * 100 +"ms";
      
  }
  });

  
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //max not include, min include
}

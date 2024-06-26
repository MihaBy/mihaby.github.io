
// set --base-size in root: css
// set images == --base-size

let lightEl = null;
let wheelEl = null;
let wheelBgEl = null;
let wheelContainer = null;
let contentEl = null;

let hl = null;
let wl = null;

let hwbe = null;
let wwbe = null;
let ww = null;
let hw = null;

let oversizedImgSize = null;

document.addEventListener("DOMContentLoaded", () => {
  lightEl = document.querySelectorAll('[data-attr="light"]')[0];
  wheelEl = document.querySelectorAll('[data-attr="wheel"]')[0];
  wheelBgEl = document.querySelectorAll('[data-attr="wheel-layot"]')[0];
  wheelContainer = document.querySelectorAll('[data-attr="wheel-container"]')[0];
  contentEl =  document.querySelectorAll('[data-attr="content"]')[0];

  wheelEl.style.height = +wheelEl.offsetWidth + 'px';

  ww = getComputedStyle(wheelEl).getPropertyValue('--wheel-w');
  hw = getComputedStyle(wheelEl).getPropertyValue('--wheel-h');

  oversizedImgSize = toNumber(lightEl.naturalWidth);
  lightEl.style.maxWidth = oversizedImgSize / toNumber(ww) * toNumber(wheelEl.offsetWidth) + 'px';

  lightEl.onload = function() {

    wl = this.naturalWidth;
    hl = this.naturalHeight;

    lightEl.style.left = sizeCalc(ww,wl);
    lightEl.style.top = sizeCalc(hw,hl);
  }

  //test





  var ad = document.getElementsByClassName('inner-parallax-images')[0];
  console.log(ad);
  //var bgpEl = ad.style.backgroundImage;
  var style = window.getComputedStyle(ad);
  var bgpEl = style.getPropertyValue('background-position-x');
  console.log(bgpEl);
  console.log( 'original');


  //section 2 
  var breakpointWidth = window.getComputedStyle(document.body).getPropertyValue('--breakpoints__md');
  breakpointWidth = toFloatNumber (breakpointWidth);
  console.log(breakpointWidth);
  var adWidth = ad.offsetWidth;
  var k = 6;
  var calcOffset = breakpointWidth / adWidth * k;
  console.log(calcOffset);

//section 1 
  var bgpArr = [];
  var accumulator ='';
  console.log(bgpEl.length);console.log('bgpEl.length');
  console.log(bgpEl[bgpEl.length - 1 ]);console.log('bgpEl.length-1');
  for (let i = 0; i < bgpEl.length; i++ ) {
     if (i == bgpEl.length - 1 ) {
      console.log(accumulator);
      console.log('accumulator');
      bgpArr.push(accumulator);
      accumulator ='';
    }
    else if (bgpEl[i] !== ',') {
    accumulator = accumulator + String(bgpEl[i]);
    console.log(accumulator);
    console.log(i);
    }
    
    else {bgpArr.push(accumulator);
    accumulator ='';
    }
  }
  console.log(bgpArr);
  console.log('bgpArr');

  for (let i = 0; i < bgpArr.length; i++ ) {
    bgpArr[i] = toFloatNumber (bgpArr[i]);
  }
  console.log(bgpArr);
  //calc
  for (let i = 0; i < bgpArr.length; i++ ) {
    if (bgpArr[i] < 50) {
      //bgpArr[i] = bgpArr[i] + 10;calcOffset
      bgpArr[i] = bgpArr[i] + calcOffset;
    } 
    else { 
      //bgpArr[i] = bgpArr[i] - 10;
      bgpArr[i] = bgpArr[i] - calcOffset;
    }
  }

  console.log(bgpArr);
  for (let i = 0; i < bgpArr.length; i++ ) {
    bgpArr[i] = bgpArr[i] + '%';
  }
  console.log(bgpArr);
  var bgpString ='';
  for (let i = 0; i < bgpArr.length; i++ ) {
    if (i === bgpArr.length - 1) {
      bgpString = bgpString +' ' + bgpArr[i];
    }
    else bgpString = bgpString +' ' + bgpArr[i] + ',';
  }
  console.log(bgpString);

  document.getElementsByClassName('heading')[0].addEventListener('click', function() {
    ad.style['background-position-x'] = bgpString;
  });
  //if root media < 900 
  //calc save and update value
  //add k = document.offsetwidth (360-1900)  = 900/360 = 3 900/2000 = 0.5  (0.5 - 3) * (2-4) = (2% -12%) 



});


window.addEventListener("resize", () => {
    
  lightEl.style.left = sizeCalc(ww,wl);
  lightEl.style.top = sizeCalc(hw,hl);

  wheelEl.style.height = wheelEl.offsetWidth + 'px';
  lightEl.style.maxWidth = oversizedImgSize / toNumber(ww) * toNumber(wheelEl.offsetWidth) + 'px';
});


  /* functions */ 

function toNumber (input) {
  input = String(input);
  let output = [];
  for (let i = 0; i < input.length; i++) {
    if ( Number(input[i]) == String(input[i])) {
      output.push(input[i]);
    }
  }

  output = output.join('');
  output = Number(output);

  return output;
}

function toFloatNumber (input) {
  input = String(input);
  let output = [];
  for (let i = 0; i < input.length; i++) {
    if ( Number(input[i]) == String(input[i]) || input[i] ==='.' ) {
      output.push(input[i]);
    }
  }

  output = output.join('');
  output = Number(output);

  return output;
}
function sizeCalc (first, second) {
    return (((toNumber(first) - toNumber(second)) / 2) / toNumber(first)) * 100 + '%';
}

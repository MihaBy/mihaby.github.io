
const quoteBlockConfigMain = {
    item: 'quote__item',
    //block: 'quote',
    block: "[data-component='run__line--main']",
    itemContent: '--item--content',
    widthBeforeElement: '--item--sub-element--width',
    quantity: 3, 
    CssScaleK: '--scale--k',
    scaleCoeffitient: 1.3,
  }

const quoteBlockConfigSecondary = {
    item: 'quote__item',
    //block: 'quote',
    block: "[data-component='run__line--secondary']",
    itemContent: '--item--content',
    widthBeforeElement: '--item--sub-element--width',
    quantity: 3, 
    CssScaleK: '--scale--k',
    scaleCoeffitient: 1.3,
  }

  const quoteBlockConfigThird = {
    item: 'quote__item',
    //block: 'quote',
    block: "[data-component='run__line--third']",
    itemContent: '--item--content',
    widthBeforeElement: '--item--sub-element--width',
    quantity: 3, 
    CssScaleK: '--scale--k',
    scaleCoeffitient: 1.3,
  }

function RunLine (quoteBlockConfig) {
  
    let quoteMainElement = document.querySelectorAll(quoteBlockConfig.block)[0];
    //let quoteBlockName = document.getElementsByClassName(quoteBlockConfig.item)[0];
    let quoteBlockName = quoteMainElement.children[0];
    //let quoteMainElement = document.getElementsByClassName(quoteBlockConfig.block)[0];
    console.warn(quoteBlockName);
      if( typeof(quoteBlockName) != "undefined" && typeof(quoteMainElement) != "undefined") {
        
        function getScaleK() {
          let style = getComputedStyle(quoteMainElement)
          .getPropertyValue('--scale--k');
          return style;
        }
    
        function setScaleK() {
          let value = Number(getScaleK());
            if (value !== "NaN" && value !== 0) {
              quoteBlockConfig.scaleCoeffitient = value;
            }
        }
        function changeSpanWidth(child) {
          let spanWidth = child.offsetWidth;
          spanWidth = spanWidth * quoteBlockConfig.scaleCoeffitient;
          spanWidth = spanWidth / 2;
          spanWidth = spanWidth + "px";
          quoteMainElement.style.setProperty(quoteBlockConfig.widthBeforeElement, spanWidth); 
        }
    
        function setElementContent(child) {
          let innerContent  = child.innerHTML;
          innerContent = ' " ' + innerContent + ' " ';
          quoteMainElement.style.setProperty(quoteBlockConfig.itemContent, innerContent);

        }
    
        function createItemBlock () {
         for (let i = 0; i < quoteBlockConfig.quantity; i++ ) {
          var clone = quoteBlockName.cloneNode(true);
          quoteMainElement.appendChild(clone);
          }
        }
    
    
          let pElement = quoteBlockName;
          setScaleK();
          createItemBlock ();
          for (const child of pElement.children) {
            if (child.tagName == 'SPAN') {
              setElementContent(child);
              changeSpanWidth(child);
            }
          }
        
      }
    
  }


document.addEventListener("DOMContentLoaded", () => {
  RunLine (quoteBlockConfigMain);
  RunLine (quoteBlockConfigSecondary);
  RunLine (quoteBlockConfigThird);
});
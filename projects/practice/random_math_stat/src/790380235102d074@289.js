function _1(data,md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;" class="container-lg mx-2">Gallery</div>

# chart

This chart shows the relationship between at what move the guessed number is guessed (the chance of guessing is given in percent) and the number of guesses`
)}

function _selection(d3,data)
{

  // Specify the chart’s dimensions.
  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the horizontal (x) scale, positioning N/A values on the left margin.
  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["resulted_value"])]).nice()
      .range([marginLeft, width - marginRight])
      .unknown(marginLeft);

  // Create the vertical (y) scale, positioning N/A values on the bottom margin.
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["count_of_vaules"])]).nice()
      .range([height - marginBottom, marginTop])
      .unknown(height - marginBottom);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .property("value", []);

  // Append the axes.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", -4)
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .text("find result in this count"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 4)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("count Of Vaules"));

  // Append the dots.
  const dot = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 0.8)
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${x(d["resulted_value"])},${y(d["count_of_vaules"])})`)
      .attr("r", 1.5);

  // Create the brush behavior.
  svg.call(d3.brush().on("start brush end", ({selection}) => {
    let value = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      value = dot
        .style("stroke", "gray")
        .filter(d => x0 <= x(d["resulted_value"]) && x(d["resulted_value"]) < x1
                && y0 <= y(d["count_of_vaules"]) && y(d["count_of_vaules"]) < y1)
        .style("stroke", "steelblue")
        .data();
    } else {
      dot.style("stroke", "steelblue");
    }

    // Inform downstream cells that the selection has changed.
    svg.property("value", value).dispatch("input");
  }));

  return svg.node();
}

let dataset = JSON.parse('[{"Name":"chevrolet chevelle malibu","Miles_per_Gallon":18,"Cylinders":8,"Displacement":307,"Horsepower":130,"Weight_in_lbs":3504,"Acceleration":12,"Year":1970,"Origin":"USA"},{"Name":"buick skylark 320","Miles_per_Gallon":15,"Cylinders":8,"Displacement":350,"Horsepower":165,"Weight_in_lbs":3693,"Acceleration":11.5,"Year":1970,"Origin":"USA"},{"Name":"plymouth satellite","Miles_per_Gallon":18,"Cylinders":8,"Displacement":318,"Horsepower":150,"Weight_in_lbs":3436,"Acceleration":11,"Year":1970,"Origin":"USA"},{"Name":"amc rebel sst","Miles_per_Gallon":16,"Cylinders":8,"Displacement":304,"Horsepower":150,"Weight_in_lbs":3433,"Acceleration":12,"Year":1970,"Origin":"USA"},{"Name":"ford torino","Miles_per_Gallon":17,"Cylinders":8,"Displacement":302,"Horsepower":140,"Weight_in_lbs":3449,"Acceleration":10.5,"Year":1970,"Origin":"USA"},{"Name":"ford galaxie 500","Miles_per_Gallon":15,"Cylinders":8,"Displacement":429,"Horsepower":198,"Weight_in_lbs":4341,"Acceleration":10,"Year":1970,"Origin":"USA"},{"Name":"chevrolet impala","Miles_per_Gallon":14,"Cylinders":8,"Displacement":454,"Horsepower":220,"Weight_in_lbs":4354,"Acceleration":9,"Year":1970,"Origin":"USA"},{"Name":"plymouth fury iii","Miles_per_Gallon":14,"Cylinders":8,"Displacement":440,"Horsepower":215,"Weight_in_lbs":4312,"Acceleration":8.5,"Year":1970,"Origin":"USA"},{"Name":"pontiac catalina","Miles_per_Gallon":14,"Cylinders":8,"Displacement":455,"Horsepower":225,"Weight_in_lbs":4425,"Acceleration":10,"Year":1970,"Origin":"USA"},{"Name":"amc ambassador dpl","Miles_per_Gallon":15,"Cylinders":8,"Displacement":390,"Horsepower":190,"Weight_in_lbs":3850,"Acceleration":8.5,"Year":1970,"Origin":"USA"},{"Name":"citroen ds-21 pallas","Miles_per_Gallon":null,"Cylinders":4,"Displacement":133,"Horsepower":115,"Weight_in_lbs":3090,"Acceleration":17.5,"Year":1970,"Origin":"Europe"},{"Name":"chevrolet chevelle concours (sw)","Miles_per_Gallon":null,"Cylinders":8,"Displacement":350,"Horsepower":165,"Weight_in_lbs":4142,"Acceleration":11.5,"Year":1970,"Origin":"USA"},{"Name":"ford torino (sw)","Miles_per_Gallon":null,"Cylinders":8,"Displacement":351,"Horsepower":153,"Weight_in_lbs":4034,"Acceleration":11,"Year":1970,"Origin":"USA"}] '); 
//console.info(dataset);
/*
function _3(selection){return(
selection
)}*/

function _data(FileAttachment){
  let checkArray = JSON.parse( sessionStorage.sortedArray );
  if ( typeof  checkArray == "undefined" || checkArray.length == 0 ) {
    //console.info(" if dataset");
    return(dataset);
  }
  else {
    //console.info(checkArray);
    //console.info(" if checkArray");
    dataset  = checkArray;
    return(dataset);
  }
  }

export default function define(runtime, observer) {
  const main = runtime.module();

  main.variable(observer()).define(["data","md"], _1);
  main.variable(observer("viewof selection")).define("viewof selection", ["d3","data"], _selection);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  return main;
}



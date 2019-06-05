// Load in data
// var requests = [d3.json("buurten.json"), d3.json("database.json")];
// Promise.all(requests).then(function(res) {
//     makeMap(res[0], res[1])
// }).catch(function(e){
//     throw(e);
//     });

var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svg = d3.select("#map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers()
  .center([4.9, 52.366667])
  .parallels([51.5, 51.49])
  .rotate(120)
  .scale(250000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw west", "N": "Noord", "T": "Zuidoost"}

var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    colorStadsdelen = d3.scaleOrdinal(d3.schemePastel2); //d3.schemeGreys)
    colorLines = d3.scaleSequential(d3.schemeCategory20);

svg.append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("font-size", "large")
  .attr("text-decoration", "underline")
  .attr("font-weight", "bold")
  .text("Huurklasse");

var y0 = 30;
var spacingy = 20
var x0 = 5
var spacingx = 55

/*Legenda*/
// svg.append("line")
//   .attr("class", "tram")
//   .attr("stroke", colorScale(1))
//   .attr("stroke-width", 7)
//   .attr("y1", y0)
//   .attr("y2", y0)
//   .attr("x1", x0)
//   .attr("x2", spacingx);
// svg.append("text")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + 5)
//   .attr("class", "label")
//   .text("Tramlijn");
//
// // svg.append("line")
// //   .attr("class", "metro")
// //   .attr("stroke", colorScale())
// //   .attr("stroke-width", 7)
// //   .attr("y1", y0 + spacingy )
// //   .attr("y2", y0 + spacingy )
// //   .attr("x1", x0)
// //   .attr("x2", spacingx);
// svg.append("text")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy + 5)
//   .attr("class", "label")
//   .text("Metrolijn");
//
// svg.append("line")
//   .attr("class", "train")
//   .attr("y1", y0 + spacingy * 2)
//   .attr("y2", y0 + spacingy * 2)
//   .attr("x1", x0)
//   .attr("x2", 50);
// svg.append("text")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 2+ 5)
//   .attr("class", "label")
//   .text("Treinspoor");
//
// svg.append("circle")
//   .attr("class", "station")
//   .attr("cx", x0 + 22)
//   .attr("cy", y0 + spacingy * 3);
// svg.append("text")
//   .attr("class", "label")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 3 + 5)
//   .text("Treinstation");
//
// svg.append("circle")
//   .attr("fill", "white")
//   .attr("stroke", "black")
//   .attr("r", "1.5")
//   .attr("cx", x0 + 22)
//   .attr("cy", y0 + spacingy * 4);
// svg.append("text")
//   .attr("class", "label")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 4 + 5)
//   .text("Tram/metro halte");

d3.queue()
    .defer(d3.json, "buurten.json")
    // .defer(d3.json, "trammetro.json")
    // .defer(d3.json, "trammetrostations.geojson")
    // .defer(d3.json, "spoor.geojson")
    // .defer(d3.csv,  "treinstations.csv")
    .await(ready);

function ready(error, buurten) {
  if (error) throw error;

  /* Areas */
  var stadsdelen = topojson.feature(buurten, buurten.objects.buurten).features;

  // Draw the buurten
  svg.selectAll(".buurt")
      .data(stadsdelen)
    .enter().insert("g")
      .append("path")
        .attr("class", "buurt")
        .attr("d", path)
        // .attr("fill", "#faebc4")
        .attr("fill", function(d) { return colorStadsdelen(d.properties.Stadsdeel_code[0]) })
      .append("title")
        .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie });


  // // Draw borders around buurten
  // svg.append("path")
  //     .attr("class", "buurt-borders")
  //     .attr("d", path(topojson.mesh(buurten, buurten.objects.buurten, function(a, b) { return a !== b; })));

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(buurten, buurten.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));

};

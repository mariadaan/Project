function makeMap(buurtdata, data, stadsdeel_info){
  // Connect stadsdeelcode to stadsdeelnaam
  var stadsdeel = {"A": "Centrum",
                  "B": "Nieuw-West",
                  "E": "West",
                  "M": "Oost",
                  "K": "Zuid",
                  "F": "Nieuw-West",
                  "N": "Noord",
                  "T": "Zuidoost"}

  // Margin, width and height for SVG
  var margin = {top: 40, right: 40, bottom: 0, left: 40};
      width = 500,
      height = 400

  // Create SVG for map
  var svg = d3.select("#map")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

  // Define map projection
  var projection = d3.geoAlbers()
                     .center([4.9, 52.366667])
                     .parallels([51.5, 51.49])
                     .rotate(120)
                     .scale(130000)
                     .translate([width / 2, height / 2]);

  // Define path generator
  var path = d3.geoPath()
               .projection(projection);

  // Show title
  d3.select("#titlemap")
    .append("h2")
    .text("Huurklasse: percentage woningen van minder dan €425 per maand")

  // Define spacing
  var y0 = 30;
  var spacingy = 20
  var x0 = 5
  var spacingx = 55

  // Get buurt objects from topojson file
  var buurten = topojson.feature(buurtdata, buurtdata.objects.buurten).features;

  // Create variable for stadsdeelnaam and buurtcode
  var stadsdeelnaam = ""
  var buurtcode = ""

  // Create tooltip element
  var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        stadsdeelnaam = stadsdeel[d.properties.Stadsdeel_code]
        buurtcode = d.properties.Buurtcombinatie_code

        // Error/missing data checker
        if (typeof data[d.properties.Buurtcombinatie_code] !== 'undefined') {
          // Show buurtnaam and percentage value in tooltip
          return d.properties.Buurtcombinatie + "<br>" + percentageFormat(data[buurtcode]['< 425'])
        }
        else{
          return d.properties.Buurtcombinatie
        }
      });
    svg.call(toolTip);

  // Create defs element to store graphical object (gradient legenda)
  var defs = svg.append("defs");

  // Append linearGradient element to the defs
  var linearGradient = defs.append("linearGradient")
                           .attr("id", "linear-gradient");

  // Set the color for the start (0%)
  linearGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "white");

  // Set the color for the end (100%)
  linearGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(31, 120, 180)");

  // Define width and height of gradient rectangle
  var width = 230
  var height = 20

  // Define where on svg the element and text labels should be located
  var xStart = 40
  var distance = 78

  // Draw the rectangle and fill with gradient
  svg.append("rect")
     .attr("y", 340)
     .attr("x", xStart)
     .attr("width", width)
     .attr("height", height)
     .style("fill", "url(#linear-gradient)");

  // Add labels to map legend
  function addLabel(svg, x, label){
    svg.append("text")
       .attr("y", 377)
       .attr("x", x)
       .attr("text-anchor", "middle")
       .attr("font-size", 13)
       .text(label)
       .style("fill", "DarkSlateGray");
  }

  labels = ["0%", "25%", "50%", "75%"]

  // Place labels at the right coordinates
  for (i in labels){
    var offset = xStart + distance * i
    addLabel(svg, offset, labels[i])
    }


  // Draw the buurten
  svg.selectAll(".buurt")
     .data(buurten)
     .enter().insert("g")
     .append("path")
     .attr("class", "buurt")
     .attr("d", path)
     .append("title")
     .text(function(d) {
       return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie
      });

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(buurtdata, buurtdata.objects.buurten, function(a, b) {
        return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code];
        })));

  // Give map a color range (blue)
  var color = d3.scaleLinear()
  .domain([0, 60])
  .range(["white", "rgb(31, 120, 180)"]);

  // Variable to store value of '< 425' category for each buurt
  var value = 0

	// Make map interactive
	svg.selectAll(".buurt")
	   .attr("stroke", "rgba(0, 0, 0, 0.3)")
     .attr('fill',function(d, i) {
       // Error/missing data checker
       if (typeof data[d.properties.Buurtcombinatie_code] !== 'undefined') {
          var value = data[d.properties.Buurtcombinatie_code]['< 425']
       }
       else{
         var value = 10 // will make the color black
       }
       // Make colour depending on value
       return color(parseInt(value * 100)); })
     .on("click", function(d){
       // Update all charts
       var keys = getData(data, stadsdeelnaam, "Huurvoorraad")[0]
       var values = getData(data, stadsdeelnaam, "Huurvoorraad")[1]
       updateBarchart(stadsdeelnaam, keys, values)
       handleButtons(data, stadsdeelnaam)
       makePiechart(data, stadsdeelnaam)
       updateInfo(stadsdeel_info, stadsdeelnaam)
       fillAgain(svg, color, data, stadsdeel, stadsdeelnaam)
       updateTitle(stadsdeelnaam)

       // Prevent to select parents when children are clicked
       d3.event.stopPropagation()
        })
		 .on('mouseover', toolTip.show)
     .on('mouseout', toolTip.hide)

  // Go back to initial page when background is clicked
  d3.select("#map")
      .on("click", function(d){
        var stadsdeelnaam = "Amsterdam"
        var keys = getData(data, stadsdeelnaam, "Huurvoorraad")[0]
        var values = getData(data, stadsdeelnaam, "Huurvoorraad")[1]
        updateBarchart(stadsdeelnaam, keys, values)
        fillAgain(svg, color, data, stadsdeel, "Amsterdam")
        initialPage(data, stadsdeel_info)
        updateInfo(stadsdeel_info, stadsdeelnaam)
        })

  // Draw all initial charts
  initialPage(data, stadsdeel_info)
  makeBarchart(data, "Amsterdam")
  showInfo(stadsdeel_info, "Amsterdam")
};


// Give selected stadsdeel another color range (green)
function fillAgain(svg, color, data, stadsdeel, stadsdeelnaam){
  var color2 = d3.scaleLinear()
  .domain([0, 75])
  .range(["white", "rgb(134, 191, 84)"]);

  // Fill stadsdeel
	svg.selectAll(".buurt")
      .transition()
      .duration(1000)
     .attr('fill',function(d, i) {
       // Make colour depending on value
       var value = data[d.properties.Buurtcombinatie_code]['< 425']

       if (stadsdeelnaam == stadsdeel[d.properties.Stadsdeel_code] && stadsdeelnaam !== "Amsterdam"){
         // Fill green
         var value = data[d.properties.Buurtcombinatie_code]['< 425']
         return color2(parseInt(value * 100))
       }
       else {
         // Fill blue
         return color(parseInt(value * 100));
       }
      })
  }

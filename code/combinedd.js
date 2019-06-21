// Maria Daan (11243406)

// Load in data
var requests = [d3.json("buurten.json"), d3.json("database.json"), d3.json("stadsdeel_info.json")];
Promise.all(requests).then(function(res) {
    // Initialize page with all elements
    makeMap(res[0], res[1], res[2])
}).catch(function(e){
    throw(e);
    });

// Convert float values to percentage format string
function percentageFormat(number){
  number = String(Math.round((number) * 100))
  percentage = number + "%"
  return percentage
}

function makeMap(buurtdata, data, stadsdeel_info){
  var stadsdeel = {"A": "Centrum",
                  "B": "Nieuw-West",
                  "E": "West",
                  "M": "Oost",
                  "K": "Zuid",
                  "F": "Nieuw-West",
                  "N": "Noord",
                  "T": "Zuidoost"}

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

  //Define path generator
  var path = d3.geoPath()
    .projection(projection);

  // Show title
  d3.select("#titlemap")
    .append("h2")
    .text("Huurklasse: percentage woningen van minder dan €425 per maand")

  var y0 = 30;
  var spacingy = 20
  var x0 = 5
  var spacingx = 55

  // Create stadsdelen
  var stadsdelen = topojson.feature(buurtdata, buurtdata.objects.buurten).features;
  var stadsdeelnaam = ""
  var buurtcode = ""

  // Create tooltip element
  var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        stadsdeelnaam = stadsdeel[d.properties.Stadsdeel_code]
        // Als buurtdata niet beschikbaar is, stadsdeeldata gebruiken of grijs maken?
        buurtcode = d.properties.Buurtcombinatie_code
        if (typeof data[d.properties.Buurtcombinatie_code] !== 'undefined') {
          return d.properties.Buurtcombinatie + " (" + stadsdeelnaam + ")" + "<br>" + percentageFormat(data[buurtcode]['< 425'])
        }
        else{
          return d.properties.Buurtcombinatie
        }
      });
    svg.call(tool_tip);

  // Append a defs (for definition) element to your SVG
  var defs = svg.append("defs");

  // Append a linearGradient element to the defs and give it a unique id
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

  width = 230
  height = 20
  x_start = 40
  x_end = x_start + width
  distance = 78

  // Draw the rectangle and fill with gradient
  svg.append("rect")
    .attr("y", 340)
    .attr("x", x_start)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "url(#linear-gradient)");

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

  for (i in labels){
    var offset = x_start + distance * i
    addLabel(svg, offset, labels[i])
 	}

  // Draw the buurten
  svg.selectAll(".buurt")
      .data(stadsdelen)
    .enter().insert("g")
      .append("path")
        .attr("class", "buurt")
        .attr("d", path)
      .append("title")
        .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie });

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(buurtdata, buurtdata.objects.buurten, function(a, b) {
        return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code];
        })));

  // Give map a color range
  var color = d3.scaleLinear()
  .domain([0, 60])
  .range(["white", "rgb(31, 120, 180)"]);

  var waarde = 0

	// Make map interactive
	svg.selectAll(".buurt")
	   .attr("stroke", "rgba(0, 0, 0, 0.3)")
     .attr('fill',function(d, i) {
       // Make colour depending on value
       if (typeof data[d.properties.Buurtcombinatie_code] !== 'undefined') {
           // the variable is defined
           waarde = data[d.properties.Buurtcombinatie_code]['< 425']
       }
       else{
         waarde = 10
       }
       return color(parseInt(waarde * 100)); })
     .on("click", function(d){
       updateBarchart(data, stadsdeelnaam)
       makePiechart(data, stadsdeelnaam)
       showInfo(stadsdeel_info, stadsdeelnaam)
       fillAgain(svg, color, data, stadsdeel, stadsdeelnaam)
       updateTitle(stadsdeelnaam)
       d3.event.stopPropagation() // prevent to select parents when children are clicked
        })
		 .on('mouseover', tool_tip.show)
     .on('mouseout', tool_tip.hide)

  // Go back to initial page when background is clicked
  d3.select("#map")
      .on("click", function(d){
        initialPage(data, stadsdeel_info)
        fillAgain(svg, color, data, stadsdeel, "Amsterdam")
        })

  // Draw all initial charts
  initialPage(data, stadsdeel_info)
};

function fillAgain(svg, color, data, stadsdeel, stadsdeelnaam){
  // Give selected stadsdeel another color range
  var color2 = d3.scaleLinear()
  .domain([0, 75])
  .range(["white", "rgb(134, 191, 84)"]);

  // fill stadsdeel
	svg.selectAll(".buurt")
	   .attr("stroke", "rgba(0, 0, 0, 0.3)")
     .attr('fill',function(d, i) {
       // Make colour depending on value
       waarde = data[d.properties.Buurtcombinatie_code]['< 425']

       if (stadsdeelnaam == stadsdeel[d.properties.Stadsdeel_code] && stadsdeelnaam !== "Amsterdam"){
         waarde = data[d.properties.Buurtcombinatie_code]['< 425']
         return color2(parseInt(waarde * 100))
       }
       else {
         return color(parseInt(waarde * 100));
       }
      })
  }

// Initialize page with all elements
function initialPage(data, stadsdeel_info){
  stadsdeelnaam = "Amsterdam"
  showInfo(stadsdeel_info, stadsdeelnaam)
  makeBarchart(data, stadsdeelnaam)
  makePiechart(data, stadsdeelnaam)
  updateTitle(stadsdeelnaam)
}

function updateTitle(stadsdeelnaam){
  // Update main title on top of the page
  d3.select("#titlepage").select("h1")
    .transition()
    .text(stadsdeelnaam + ", 2013")
}

function showInfo(stadsdeel_info, stadsdeelnaam){
  // Remove former piechart and title, if existing
  d3.select("#info").selectAll("*").remove();

  var margin = 30,
			width = 500 - margin - margin;
			height = 400 - margin - margin;


  var svg = d3.select("#info")
              .attr("width",  width + margin + margin)
              .attr("height", height + margin + margin);

  svg.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("font-size", "medium")
    .text(stadsdeel_info[stadsdeelnaam]);
}

function makePiechart(data, stadsdeelnaam){
  // Remove former piechart and title, if existing
  d3.select("#piechart").selectAll("*").remove();

  // Define width and height for barchart svg
	var margin = {top: 20, right: 50, bottom: 20, left: 5},
			width = 500 - margin.left - margin.right;
			height = 300 - margin.top - margin.bottom;

  // The radius of the pieplot is half the width or half the height (smallest one). Substract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin.top

  // Append the svg object to the div called 'piechart'
  var svg = d3.select("#piechart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
      				.attr("height", height + margin.top + margin.bottom)
              .append("g")
              // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
              .attr("transform", "translate(" + 140 + "," + 150 + ")");

   // Create list of all keys and all values
 	keys = Object.keys(data[stadsdeelnaam])
 	values = [];
 	for (i in keys){
 		values.push(data[stadsdeelnaam][keys[i]]);
 	}

  function selectElements(keys, values){
    var data = {};
    for (i = 0; i < keys.length; i++) {
      data[String(keys[i])] = values[i];
    }
    return data
  }

  // Select wanted elements
  keys1 = keys.slice(0, 3)
  values1 = values.slice(0, 3)
  keys2 = keys.slice(8,14)
  values2 = values.slice(8,14)
  keys3 = keys.slice(14, 20)
  values3 = values.slice(14, 20)
  keys4 = keys.slice(20, 26)
  values4 = values.slice(20, 26)
  keys5 = keys.slice(26, 30)
  values5 = values.slice(26, 30)

  // Create dictionaries for each category
  var eigendomscategorie = selectElements(keys1, values1)
  var inkomensgroepen = selectElements(keys2, values2)
  var woonsituatie = selectElements(keys3, values3)
  var leeftijdsgroep = selectElements(keys4, values4)
  var opleidingsniveau = selectElements(keys5, values5)

  // Connect dropdown menu options to actual data
  all_data = {"Eigendomscategorie": eigendomscategorie,
              "Inkomensgroepen": inkomensgroepen,
              "Woonsituatie": woonsituatie,
              "Leeftijdsgroep": leeftijdsgroep,
              "Opleidingsniveau": opleidingsniveau}


  // Create dropdown element
  var dropdown = d3.select("#piechart")
                    .insert("select", "svg")
                    .attr("id", "dropdown")
                    .on("change", function(d){
                      update(all_data[this.value], this.value)
                      })

  // Give options to dropdown
  dropdown.selectAll("option")
      .data(["Eigendomscategorie", "Inkomensgroepen", "Woonsituatie", "Leeftijdsgroep", "Opleidingsniveau"])
      .enter().append("option")
      .text(function (d) {
        return d; })

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemePaired);

  // A function that create / update the plot for a given variable:
  function update(data, categorie) {
    var titles = {"Eigendomscategorie": "Omvang woningvoorraad naar eigendomscategorie per (samengestelde) buurtcombinatie",
                "Inkomensgroepen": "Recente instromers en zittende bewoners naar inkomensgroepen",
                "Woonsituatie": "Vorige woonsituatie recente instromers en zittende bewoners",
                "Leeftijdsgroep": "Leeftijdsgroep recente instromers en zittende bewoners",
                "Opleidingsniveau": "Opleidingsniveau recente instromers en zittende bewoners"}

    d3.select("#titlepie").selectAll("*").remove()

    // Show title
    d3.select("#titlepie")
      .append("h2")
      .text(titles[categorie])

    // Compute the position of each group on the pie
    var pie = d3.pie()
      .value(function(d) {return d.value; });

    var data_ready = pie(d3.entries(data))

    // Create tooltip element
     var tool_tip = d3.tip()
         .attr("class", "d3-tip")
         .html(function(d) {
           key = d.data.key
           value = d.data.value
           return key + ": " + percentageFormat(value); });
       svg.call(tool_tip);

    // map to data
    var u = svg.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);

    svg.selectAll("path")
      .on('mouseover', tool_tip.show)
  		.on('mouseout', tool_tip.hide);

    // Remove the groups that are not present anymore
    u
      .exit()
      .remove()

    d3.select("#piechart").selectAll("#legendaa").remove();

    var legend = d3.legendColor()
    .scale(color)
    .cellFilter(function(d){
      if (data[d.label]){
        return true
      }
      else {
        return false
      }
    });

    svg.append("g")
    .attr("id", "legendaa")
    .attr("transform", "translate(150,-110)")
    .call(legend);
    }

    // Initialize the plot with the first dataset
    update(eigendomscategorie, "Eigendomscategorie")

  }

function makeBarchart(data, stadsdeelnaam){
  d3.select("#titlebars").select("h2").remove();

  var titles = {"Huurvoorraad": "Omvang huurvoorraad in vier klassen",
                "Inkomensgroepen": "Bewoners naar inkomensgroepen"}

  d3.select("#titlebars")
    .append("h2")
    .text(titles["Huurvoorraad"])

  // Define width and height for barchart svg
  var margin = {top: 20, right: 30, bottom: 20, left: 50},
  		width = 500 - margin.left - margin.right;
  		height = 300 - margin.top - margin.bottom;

  // Create SVG
  var svg = d3.select("#barchart")
  			.append("svg")
  			.attr("width", width + margin.left + margin.right)
  			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
    		.attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  keys = Object.keys(data[stadsdeelnaam])

  // Scale the range of the data in the domains
  // Hardcode y-domain to make it easier to compare barcharts
  x.domain(keys);
  y.domain([0, 0.7]);

  // Create tooltip element
  var tool_tip = d3.tip()
     .attr("class", "d3-tip")
     .offset([-8, 0])
     .html(function(d) { return percentageFormat(d); });
   svg.call(tool_tip);

  // Add x axis
  svg.append("g")
  			.attr("transform", "translate(0," + height + ")")
  			.call(d3.axisBottom(x))
  			.style("font-size", "8px");

  // Add y axis
  svg.append("g")
  	.call(d3.axisLeft(y));

  // Add text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", -70)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
  		.style("font-size", "12px")
      .text("Percentage -->");

  // Button elements showing when active
  var button1 = d3.select("#Huurvoorraad")
                    .on("click", function(d){
                      button2.classed("active", false)
                      button1.classed("active", true)
                      updateBarchart(data, stadsdeelnaam, "Huurvoorraad")
                      })

  var button2 = d3.select("#Inkomensgroepen")
                    .on("click", function(d){
                      button1.classed("active", false)
                      button2.classed("active", true)
                      updateBarchart(data, stadsdeelnaam, "Inkomensgroepen");
                      })

  // Initial button situation
  button1.classed("active", true)
  button2.classed("active", false)

  // Initial barchart
  updateBarchart(data, stadsdeelnaam, "Huurvoorraad")
  }

function updateBarchart(data, stadsdeelnaam, categorie){
  // Create list of all keys and all values
	keys = Object.keys(data[stadsdeelnaam])
	values = [];
	for (i in keys){
		values.push(data[stadsdeelnaam][keys[i]]);
	}

	// Select wanted elements
  var keys1 = keys.slice(3, 7)
  var values1 = values.slice(3, 7)
  var keys2 = keys.slice(8, 14)
  var values2 = values.slice(8, 14)

  keys = keys1
  values = values1

  if (categorie == "Huurvoorraad"){
    keys = keys1
    values = values1
  }
  else {
    keys = keys2
    values = values2
  }

  svg = d3.select("#barchart").select("svg")

  var bars = svg.selectAll(".bars")
                .data(values);

  // Set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);
            
  x.domain(keys);
  y.domain([0, 0.7]);

  // Add bars for new data
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return x(keys[i]); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d) })
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);

  // Update old ones, already have x / width from before
  bars
      .transition().duration(250)
      .attr("y", function(d,i) { return y(d); })
      .attr("height", function(d,i) { return height - y(d); });

  // Remove old ones
  bars.exit().remove();

  // Change barchart color to green to clarify data is about one stadsdeel
  if (stadsdeelnaam !== "Amsterdam"){
    svg.selectAll("rect")
      .transition()
      .duration(700)
      .style("fill", "rgb(134, 191, 84)")
  }
}

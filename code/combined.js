// Maria Daan (11243406)

// Load in data
var requests = [d3.json("buurten.json"), d3.json("database.json")];
Promise.all(requests).then(function(res) {
    makeMap(res[0], res[1])
}).catch(function(e){
    throw(e);
    });

function makeMap(buurtdata, data){
  var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw-west", "N": "Noord", "T": "Zuidoost"}
  var stadsdeelnaam = ""
  console.log(buurtdata.objects.buurten.geometries)
  testje = buurtdata.objects.buurten.geometries

  var i;
  for (i = 0; i < testje.length; i++) {
    code = testje[i].properties.Stadsdeel_code
    stadsdeelnaam = stadsdeel[code]
    console.log(stadsdeelnaam);
  }

  var margin = {top: 40, right: 40, bottom: 40, left: 40};

  // Create SVG for map
  var svg = d3.select("#map"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  // Define map projection
  var projection = d3.geoAlbers()
    .center([4.9, 52.366667])
    .parallels([51.5, 51.49])
    .rotate(120)
    .scale(250000)
    .translate([width / 2, height / 2]);

  //Define path generator
  var path = d3.geoPath()
    .projection(projection);

  var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      colorStadsdelen = d3.scaleOrdinal(d3.schemePastel2); //d3.schemeGreys)
      colorLines = d3.scaleSequential(d3.schemeCategory10);

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


  /* Areas */
  var stadsdelen = topojson.feature(buurtdata, buurtdata.objects.buurten).features;

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

  // Draw borders around stadsdelen
  svg.append("path")
      .attr("class", "stadsdeel-borders")
      .attr("d", path(topojson.mesh(buurtdata, buurtdata.objects.buurten, function(a, b) { return stadsdeel[a.properties.Stadsdeel_code] !== stadsdeel[b.properties.Stadsdeel_code]; })));


	// Create tooltip element
	var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        return d.objects.buurten.geometries.Stadsdeel_code
				// return d.properties.admin + "<br>" + data[d.properties.admin]["< 425"];
			});
    svg.call(tool_tip);

	// Make map interactive
	svg.selectAll("path")
	   .data(buurtdata.objects.buurten.geometries)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
	   .attr("fill", "rgba(8, 81, 156, 0.1)")
		 .on('mouseover', tool_tip.show)
     .on('mouseout', tool_tip.hide)
		 .on("click", function(d){
       console.log(d.properties.Stadsdeel_code)
			 // makeBarchart(d.properties.admin, data)
			});

};

function makeBarchart(country, data){
	// Remove former barchart and title, if existing
	d3.select("#barchart").select("svg").remove();
	d3.select("#titlebars").select("h1").remove();

	// Create list of all keys and all values
	keys = Object.keys(data[country])
	values = [];
	for (i in keys){
		values.push(data[country][keys[i]]);
	}

	// Remove non-index values from both lists
	keys.splice(0, 1)
	keys.splice(5, 1)
	values.splice(0, 1)
	values.splice(5, 1)

	// Adjust keys to fit into barchart label
	for (i in keys){
		keys[i] = keys[i].replace(" Index", "");
	}

	// Define width and height for barchart svg
	var margin = {top: 20, right: 20, bottom: 50, left: 40},
			width = 600 - margin.left - margin.right;
			height = 500 - margin.top - margin.bottom;

	// Create SVG
	var svg = d3.select("#barchart")
				.append("svg")
				.attr("id", "bars")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    		.attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

	// Show title
	d3.select("#titlebars")
		.append("h1")
		.text(country + ", 2018")

	// Set the ranges
	var x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	var y = d3.scaleLinear()
	          .range([height, 0]);

// Scale the range of the data in the domains
// Hardcode y-domain to make it easier to compare barcharts
	x.domain(keys);
	y.domain([0, 200]);

// Create tooltip element
 var tool_tip = d3.tip()
     .attr("class", "d3-tip")
     .offset([-8, 0])
     .html(function(d) { return d; });
   svg.call(tool_tip);

	// Create bars
	svg.selectAll(".bar")
		.data(values)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i) { return x(keys[i]); })
		.attr("width", x.bandwidth())
		.attr("y", function(d) { return y(d); })
		.attr("height", function(d) { return height - y(d) })
		.on('mouseover', tool_tip.show)
		.on('mouseout', tool_tip.hide);

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
      .attr("x", -60)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
			.style("font-size", "12px")
      .text("Index value -->");
}

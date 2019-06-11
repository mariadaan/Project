// Maria Daan (11243406)

// Load in data
var requests = [d3.json("buurten.json"), d3.json("database.json")];
Promise.all(requests).then(function(res) {
    makeMap(res[0], res[1])
}).catch(function(e){
    throw(e);
    });

function makeMap(buurtdata, data){
  var stadsdeel = {"A": "Centrum","B": "Nieuw-West", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw-West", "N": "Noord", "T": "Zuidoost"}

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
    .scale(150000)
    .translate([width / 2, height / 2]);

  //Define path generator
  var path = d3.geoPath()
    .projection(projection);

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
  var stadsdeelnaam = ""

  // Create tooltip element
  var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        stadsdeelnaam = stadsdeel[d.properties.Stadsdeel_code]
        return stadsdeelnaam + " (" + d.properties.Buurtcombinatie + ")" + "<br>" + data[stadsdeelnaam]['< 425'];
      });
    svg.call(tool_tip);

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

  var color = d3.scaleLinear()
  .domain([25, 60])
  .range(["rgba(102,0,0,0.4)", "rgba(102,0,0,1)"]);

	// Make map interactive
	svg.selectAll(".buurt")
	   .attr("stroke", "rgba(0, 0, 0, 0.3)")
     .attr('fill',function(d, i) {
       return color(parseInt((data[stadsdeel[d.properties.Stadsdeel_code]]['< 425']) * 100)); })
     .on("click", function(d){
       makeBarchart(data, stadsdeelnaam)
       makePiechart(data, stadsdeelnaam)
        })
		 .on('mouseover', tool_tip.show)
     .on('mouseout', tool_tip.hide)
};

function makePiechart(data, stadsdeelnaam){
  // Remove former piechart and title, if existing
  d3.select("#piechart").select("svg").remove();

  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'piechart'
  var svg = d3.select("#piechart")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var dropdown = d3.select("#piechart")
                    .insert("select", "svg")
                    .on("change", function(d) {
                      update(data2)
                    })

  dropdown.selectAll("option")
      .data(["data1", "data2"])
      .enter().append("option")
      .text(function (d) { return d; })



   // Create list of all keys and all values
 	keys = Object.keys(data[stadsdeelnaam])
 	values = [];
 	for (i in keys){
 		values.push(data[stadsdeelnaam][keys[i]]);
 	}

  // Select wanted elements
  keys1 = keys.slice(0, 3)
  values1 = values.slice(0, 3)
  keys2 = keys.slice(12, 18)
  values2 = values.slice(12, 18)

  var data1 = {}; // create an empty dict
  for (i = 0; i < keys1.length; i++) {
    data1[String(keys1[i])] = values1[i];
  }
  console.log(data1)

  var data2 = {}; // create an empty dict
  for (i = 0; i < keys2.length; i++) {
    data2[String(keys2[i])] = values2[i];
  }
  console.log(data2)

  // create 2 data_set

  // var data1 = {a: 9, b: 20, c:30, d:8, e:12}
  // var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f"])
    .range(d3.schemeDark2);

  // A function that create / update the plot for a given variable:
  function update(data) {

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))

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
      .style("opacity", 1)

    // remove the group that is not present anymore
    u
      .exit()
      .remove()

    }

    // Initialize the plot with the first dataset
    update(data1)

  }

function makeBarchart(data, stadsdeelnaam){
	// Remove former barchart and title, if existing
	d3.select("#barchart").select("svg").remove();
	d3.select("#titlebars").select("h1").remove();

	// Create list of all keys and all values
	keys = Object.keys(data[stadsdeelnaam])
	values = [];
	for (i in keys){
		values.push(data[stadsdeelnaam][keys[i]]);
	}

	// // Select wanted elements
  keys1 = keys.slice(3, 7)
  values1 = values.slice(3, 7)
  keys2 = keys.slice(7, 14)
  values2 = values.slice(7, 14)

	// Define width and height for barchart svg
	var margin = {top: 20, right: 20, bottom: 50, left: 40},
			width = 500 - margin.left - margin.right;
			height = 300 - margin.top - margin.bottom;

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
		.append("h2")
		.text(stadsdeelnaam + ", 2017")

	// Set the ranges
	var x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	var y = d3.scaleLinear()
	          .range([height, 0]);

// Scale the range of the data in the domains
// Hardcode y-domain to make it easier to compare barcharts
	x.domain(keys1);
	y.domain([0, 1]);

// Create tooltip element
 var tool_tip = d3.tip()
     .attr("class", "d3-tip")
     .offset([-8, 0])
     .html(function(d) { return d; });
   svg.call(tool_tip);


	// Create bars
	svg.selectAll(".bar")
		.data(values1)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i) { return x(keys1[i]); })
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
      .text("Percentage -->");
}

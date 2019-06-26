// Make sure buttons work correctly
function handleButtons(data, stadsdeelnaam){
  // Button elements showing when active
  var button1 = d3.select("#Huurvoorraad")
                    .on("click", function(d){
                      button2.classed("active", false)
                      button1.classed("active", true)
                      var keys1 = getData(data, stadsdeelnaam, "Huurvoorraad")[0]
                      var values1 = getData(data, stadsdeelnaam, "Huurvoorraad")[1]
                      updateBarchart(stadsdeelnaam, keys1, values1)
                      })

  var button2 = d3.select("#Inkomensgroepen")
                    .on("click", function(d){
                      button1.classed("active", false)
                      button2.classed("active", true)
                      var keys2 = getData(data, stadsdeelnaam, "Inkomensgroepen")[0]
                      var values2 = getData(data, stadsdeelnaam, "Inkomensgroepen")[1]
                      updateBarchart(stadsdeelnaam, keys2, values2);
                      })

  // Initial button situation
  button1.classed("active", true)
  button2.classed("active", false)
}


// Initialize barchart
function makeBarchart(data, stadsdeelnaam){
  var keys = getData(data, stadsdeelnaam, "Huurvoorraad")[0]
  var values = getData(data, stadsdeelnaam, "Huurvoorraad")[1]
  var categorie = "Huurvoorraad"

  var titles = {"Huurvoorraad": "Omvang huurvoorraad in vier klassen (in € per maand)",
                "Inkomensgroepen": "Bewoners naar inkomensgroepen"}

  // Update title
  d3.select("#titlebars").select("h2")
    .transition()
    .text(titles[categorie])

	// Define width and height for barchart svg
	var margin = {top: 20, right: 30, bottom: 20, left: 50},
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

	// Set the ranges
	var x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	var y = d3.scaleLinear()
	          .range([height, 0]);

  // Scale the range of the data in the domains
  // Hardcode y-domain to make it easier to compare barcharts
	x.domain(keys);
	y.domain([0, 0.7]);

  // Create tooltip element
  var toolTip = d3.tip()
     							.attr("class", "d3-tip")
     							.offset([-8, 0])
     							.html(function(d) { return percentageFormat(d); });

	 svg.call(toolTip);

  // Create bars
  svg.selectAll(".bar")
    .data(values)
		.enter()
    .append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i) { return x(keys[i]); })
		.attr("width", x.bandwidth())
		.attr("y", function(d) { return y(d); })
		.attr("height", function(d) { return height - y(d) })
		.on('mouseover', toolTip.show)
		.on('mouseout', toolTip.hide);

	// Add x axis
	svg.append("g")
        .attr("id", "x-axis")
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
      .text("Aandeel -->");
}


// Update bars when map or button is clicked
function updateBarchart(stadsdeelnaam, keys, values){
  // Define width and height for barchart svg
	var margin = {top: 20, right: 30, bottom: 20, left: 50},
			width = 500 - margin.left - margin.right;
			height = 300 - margin.top - margin.bottom;

  // Set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // Scale the range of the data in the domains
  // Hardcode y-domain to make it easier to compare barcharts
  x.domain(keys);
  y.domain([0, 0.7]);

  var bars = d3.select("#barchart").select("g").selectAll(".bar")
               .data(values);

  // Update bars height and change color to clarify data is about one stadsdeel
  bars.enter()
    	.append("rect")
    	.attr("class", "bar")
    	.merge(bars)
    	.transition()
    	.duration(1000)
    	.attr("x", function(d, i) { return x(keys[i]); })
			.attr("width", x.bandwidth())
			.attr("y", function(d) { return y(d); })
			.attr("height", function(d) { return 260 - y(d) })
    	.style("fill", function(d){
		      if (stadsdeelnaam !== "Amsterdam") {
		        return "rgb(134, 191, 84)"
		      }
		      else{
		        return "rgb(31, 120, 180)"
	      }});

	// Remove bars that are not present anymore
  bars.exit()
      .remove()

	// Update x-axis
  d3.selectAll("#x-axis")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .style("font-size", "8px");
}

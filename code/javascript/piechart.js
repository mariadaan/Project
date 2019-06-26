// Create piechart
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
              .attr("transform", "translate(" + (width / 2 - 110) + "," + height / 2 + ")");

   // Create list of all keys and all values
 	var keys = Object.keys(data[stadsdeelnaam])
 	var values = [];
 	for (i in keys){
 		values.push(data[stadsdeelnaam][keys[i]]);
 	}

  // Create a dictionary of keys and values
  function createDict(keys, values){
    var data = {};
    for (i = 0; i < keys.length; i++) {
      data[String(keys[i])] = values[i];
      }
    return data
  }

  // Select wanted elements by index
  var keys1 = keys.slice(0, 3)
  var values1 = values.slice(0, 3)
  var keys2 = keys.slice(8,14)
  var values2 = values.slice(8,14)
  var keys3 = keys.slice(14, 20)
  var values3 = values.slice(14, 20)
  var keys4 = keys.slice(20, 26)
  var values4 = values.slice(20, 26)
  var keys5 = keys.slice(26, 30)
  var values5 = values.slice(26, 30)

  // Create dictionaries for each category
  var eigendomscategorie = createDict(keys1, values1)
  var inkomensgroepen = createDict(keys2, values2)
  var woonsituatie = createDict(keys3, values3)
  var leeftijdsgroep = createDict(keys4, values4)
  var opleidingsniveau = createDict(keys5, values5)

  // Connect dropdown menu options to actual data
  var options = {"Eigendomscategorie": eigendomscategorie,
              "Inkomensgroepen": inkomensgroepen,
              "Woonsituatie": woonsituatie,
              "Leeftijdsgroep": leeftijdsgroep,
              "Opleidingsniveau": opleidingsniveau}

  // Create dropdown element
  var dropdown = d3.select("#piechart")
                    .insert("select", "svg")
                    .attr("id", "dropdown")
                    .on("change", function(d){
                      update(options[this.value], this.value);
                      })

  // Give options to dropdown
  dropdown.selectAll("option")
      .data(["Eigendomscategorie", "Inkomensgroepen", "Woonsituatie", "Leeftijdsgroep", "Opleidingsniveau"])
      .enter().append("option")
      .text(function (d) { return d; })

  // My own color range with cool blue/green colors (very aesthetic)
  var myColors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#75c493", "#7598c4"];

  // Set the color scale
  var color = d3.scaleOrdinal()
                .domain(keys)
                .range(myColors);


  // A function that creates / updates the plot for a given variable:
  function update(data, categorie) {
    var titles = {"Eigendomscategorie": "Omvang woningvoorraad naar eigendomscategorie per (samengestelde) buurtcombinatie",
                "Inkomensgroepen": "Recente instromers en zittende bewoners naar inkomensgroepen",
                "Woonsituatie": "Vorige woonsituatie recente instromers en zittende bewoners",
                "Leeftijdsgroep": "Leeftijdsgroep recente instromers en zittende bewoners",
                "Opleidingsniveau": "Opleidingsniveau recente instromers en zittende bewoners"}

    // Show full title
    d3.select("#titlepie").select("h2")
      .text(titles[categorie])

    // Compute the position of each group on the pie
    var pie = d3.pie()
                .value(function(d) {return d.value; });

    var data_ready = pie(d3.entries(data))

    // Create tooltip element
    var toolTip = d3.tip()
                    .attr("class", "d3-tip")
                    .html(function(d) {
                      key = d.data.key
                      value = d.data.value
                      return key + ": " + percentageFormat(value); });
     svg.call(toolTip);

    // map to data
    var pie = svg.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    pie.enter()
       .append('path')
       .merge(pie)
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

    // Add interactive tooltip
    svg.selectAll("path")
       .on('mouseover', toolTip.show)
    	 .on('mouseout', toolTip.hide);

    // Remove the groups that are not present anymore
    pie.exit()
       .remove()

    d3.select("#piechart").selectAll("#legend").remove();

    // Create legend elements
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

    // Add legend to piechart svg
    svg.append("g")
    .attr("id", "legend")
    .attr("transform", "translate(150,-110)")
    .call(legend);
    }

    // Initialize the plot with the first dataset
    update(eigendomscategorie, "Eigendomscategorie")

  }

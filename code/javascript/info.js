function showInfo(stadsdeel_info, stadsdeelnaam){
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

function updateInfo(stadsdeel_info, stadsdeelnaam){
  d3.select("#info").select("text")
    .transition()
    .duration(1000) // HOEZO ZIE JE DIT NIET??
    .text(stadsdeel_info[stadsdeelnaam]);
}

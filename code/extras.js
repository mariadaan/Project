// Function to convert float values to percentage format string
function percentageFormat(number){
  number = String(Math.round((number) * 100))
  percentage = number + "%"
  return percentage
}


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

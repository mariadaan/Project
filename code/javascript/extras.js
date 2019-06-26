// Function to convert float values to percentage format string
function percentageFormat(number){
  number = String(Math.round((number) * 100))
  percentage = number + "%"
  return percentage
}

function getData(data, stadsdeelnaam, categorie){
  // Create list of all keys and all values
  var keys = Object.keys(data[stadsdeelnaam])
  var values = [];
  for (i in keys){
    values.push(data[stadsdeelnaam][keys[i]]);
  }

  // Select wanted elements
  var keys1 = keys.slice(3, 7)
  var values1 = values.slice(3, 7)
  var keys2 = keys.slice(8, 14)
  var values2 = values.slice(8, 14)

  if (categorie == "Huurvoorraad"){
    var keys = keys1
    var values = values1
  }
  else{
    var keys = keys2
    var values = values2
  }

  return [keys, values];
}

function updateTitle(stadsdeelnaam){
  // Update main title on top of the page
  d3.select("#titlepage").select("h1")
    .transition()
    .duration(1000) // HOEZO ZIE JE DIT NIET??
    .text(stadsdeelnaam + ", 2013")
}

// Initialize page with all elements
function initialPage(data, stadsdeel_info){
  var stadsdeelnaam = "Amsterdam"
  // showInfo(stadsdeel_info, stadsdeelnaam)
  // makeBarchart(data, stadsdeelnaam)
  handleButtons(data, stadsdeelnaam)
  makePiechart(data, stadsdeelnaam)
  updateTitle(stadsdeelnaam)
}

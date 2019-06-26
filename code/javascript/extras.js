// Update main title on top of the page
function updateTitle(stadsdeelnaam){
  d3.select("#titlepage").select("h1")
    .text(stadsdeelnaam + ", 2013")
}

// Initialize page with all elements
function initialPage(data, stadsdeel_info){
  var stadsdeelnaam = "Amsterdam"
  handleButtons(data, stadsdeelnaam)
  makePiechart(data, stadsdeelnaam)
  updateTitle(stadsdeelnaam)
}

// Convert float values to percentage format string
function percentageFormat(number){
  number = String(Math.round((number) * 100))
  percentage = number + "%"
  return percentage
}

// Select barchart data for selected stadsdeel
function getData(data, stadsdeelnaam, categorie){
  // Create list of all keys and all values
  var keys = Object.keys(data[stadsdeelnaam])
  var values = [];
  for (i in keys){
    values.push(data[stadsdeelnaam][keys[i]]);
  }

  // Check whether Huurvoorraad or Inkomensgroepen data has to be selected
  if (categorie == "Huurvoorraad"){
    var keys = keys.slice(3, 7)
    var values = values.slice(3, 7)
  }
  else{
    var keys = keys.slice(8, 14)
    var values = values.slice(8, 14)
  }

  return [keys, values];
}

// Maria Daan (11243406)

// Load in data
var requests = [d3.json("code/data/buurten.json"), d3.json("code/data/merged/database.json"), d3.json("code/data/stadsdeel_info.json")];
Promise.all(requests).then(function(res) {
    // Initialize page
    makeMap(res[0], res[1], res[2])
}).catch(function(e){
    throw(e);
    });

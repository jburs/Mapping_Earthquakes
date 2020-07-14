// Add console.log to check to see if our code is working.
console.log("working");
// Access the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jburs/Mapping_Earthquakes/master/majorAirports.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/jburs/Mapping_Earthquakes/master/torontoRoutes.json";
// Accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/jburs/Mapping_Earthquakes/master/torontoNeighborhoods.json";


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// create a base later that holds both maps
let baseMaps = {
	"Streets": streets,
	"Satellite Streets": satelliteStreets
}


// Create the map object with a center and zoom level (scale 0-18).
// alternative form:  let map = L.map("mapid", {center: [40.7, -94.5],zoom: 4});
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);







// Map Click Feature

// onEachFeature callback fucntion:  can add a popup marker for each feature and add data from the properties
L.geoJson(sanFanAirport, {
    onEachFeature: function(feature, layer) {
		console.log(layer)
    	layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
     }
}).addTo(map);





// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (scale 0-18).
// alternative form:  let map = L.map("mapid", {center: [40.7, -94.5],zoom: 4});
let map = L.map('mapid').setView([37.5, -122.5], 10);

// get data from cities.js
let cityData = cities;


// loop through cities array, and create one marker for each city
cityData.forEach(function(city) {
	console.log(city)
	L.circleMarker(city.location, {
		radius: city.population/100000,
		color:"orange",
		fillColor: "orange",
		lineWidth: 4
	})
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
	.addTo(map);
});



// Add a circle tot the map (radium in meters!!)
// alternatively can use circleMaker(), which measures in pixels!
// L.circleMarker([34.0522, -118.2437]).addTo(map);
L.circle([34.0522, -118.2437], {
	radius: 1500,
	color: 'black',
	fillColor: 'yellow',
	fillOpacity: 0.25,
}).addTo(map);


// Create lines!!
// Coordinates for each point to be used in the line.

let locations = [];
for (i=0; i<cityData.length; i++){
	locations.push(cityData[i].location)
};
console.log(locations);


// create a polyline using the line coordinates and make the line red. 
L.polyline(locations, {
	color: "blue",
	opacity: .5,
	dashArray:6,
}).bindPopup("zoom zoom!").addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


/* available IDs to change style  https://docs.mapbox.com/api/maps/#static-tiles
mapbox.streets
mapbox.light
mapbox.dark
mapbox.satellite
mapbox.streets-satellite  */ 


// clock on map event 
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// Add GeoJSON data
let sanFanAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
    "geometry":{
        "type":"Point",
        "coordinates":[-122.375,37.61899948120117]}}
]};


// create geoJSON layer and add to map
// L.geoJSON(sanFanAirport).addTo(map);

/*
// pointToLayer callback function: adds markers to map  13.5.2
L.geoJSON(sanFanAirport, {
	// we turn each featre into a marker on the map
	pointToLayer: function(feature, latlng) {
		console.log(feature);
		return L.marker(latlng)
		.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
	}
}).addTo(map);
*/


// onEachFeature callback fucntion:  can add a popup marker for each feature and add data from the properties
L.geoJson(sanFanAirport, {
    onEachFeature: function(feature, layer) {
		console.log(layer)
    	layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
     }
}).addTo(map);



13.5.3
// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (scale 0-18).
// alternative form:  let map = L.map("mapid", {center: [40.7, -94.5],zoom: 4});
let map = L.map('mapid').setView([40, -95], 4);

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


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
// Add console.log to check to see if our code is working.
console.log("working");

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
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// create a base later that holds both maps
let baseMaps = {
	"Streets": streets,
    "Satellite Streets": satelliteStreets,
    "Dark": dark
}


// Earthquake and tectonic plates Layers
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();

// Overlay Object
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};


// Create the map object with a center and zoom level (scale 0-18).
// alternative form:  let map = L.map("mapid", {center: [40.7, -94.5],zoom: 4});
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
    layers: [streets],
    worldCopyJump:true,
    inertia: true
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);



// original site  https://earthquake.usgs.gov/data/


// Fn to determine the radius of the earthquake marker based on its magnitude
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Fn to get fill color based on mag
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// Function to return the style data for each earthquake plotted
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    }
}



// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
 	L.geoJson(data, {
        // turn each feature into a circle marker
	 	pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // add custom styling
        style: styleInfo,
        // add popup info
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
     }).addTo(earthquakes);
     //add earthquakes to map
     earthquakes.addTo(map);
});

// create a legend control object
let legend = L.control({
    position: 'bottomright'
});

// add all details for the legend
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');


    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];

    // loop through our intervals to generate a label with colored square 
    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }
        return div;
};

legend.addTo(map);



// Tectonic plates!!
// Access the tectonic plate GeoJSON URL
let tectonicPlatesData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// styling options for tectonic plates
let plateStyle = {
    color: "green",
    weight: 2.5,

}

// get tectonic plate data
d3.json(tectonicPlatesData).then(function(data) {
    console.log(data);
    // add tectonic plates to the map
    L.geoJson(data, {
        style: plateStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("Tectonic plate boundary: " + feature.properties.Name)
        }
    }).addTo(tectonicPlates);
    tectonicPlates.addTo(map);
})


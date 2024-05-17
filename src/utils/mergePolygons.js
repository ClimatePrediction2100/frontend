// mergePolygons.js for Asia
const fs = require("fs");
const turf = require("@turf/turf");

// Load the GeoJSON file
const asia = require("../data/Oceania.json");

// Extract the features (country polygons)
const features = asia.features;

// Use turf.union to merge all polygons
let mergedPolygon = features[0];
for (let i = 1; i < features.length; i++) {
	mergedPolygon = turf.union(mergedPolygon, features[i]);
}

// Add the name property to the merged feature
mergedPolygon.properties = { name: "오세아니아" };

// Create a new GeoJSON feature collection
const mergedGeoJSON = {
	type: "FeatureCollection",
	features: [mergedPolygon],
};

// Save the merged GeoJSON to a file
fs.writeFileSync("../data/MergedOceania.json", JSON.stringify(mergedGeoJSON));

console.log("Merged GeoJSON saved to MergedAsia.json");

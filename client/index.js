const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1Ijoic3d5eCIsImEiOiJjajY4M2hvcGYwY3lrMnZueXB2dDg5cWt5In0.7HkydSCJMjYLqxIxq5a-5A";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});

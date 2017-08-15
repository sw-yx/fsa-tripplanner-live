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

var mapData = function (data, targetElement) {
    data.forEach(hotel => {
      var temp = document.createElement('option')
      temp.value = hotel.id
      temp.append(hotel.name)
      targetElement.append(temp)
    })
}
var globalstore = {}
fetch('/api/all')
  .then(result => result.json())
  .then(data => {
    // data = { Hotels, Restaurants, Activities }
    var selectH = document.getElementById('hotels-choices');
    var selectR = document.getElementById('restaurants-choices');
    var selectA = document.getElementById('activities-choices');
    mapData(data.Hotels, selectH);
    mapData(data.Restaurants, selectR);
    mapData(data.Activities, selectA);
    globalstore = data
  })
  .catch(console.error)

// var setListeners = function(addButton, selectChoices, dataset, itineraryList) {
var setListeners = function(placetype) {
  document.getElementById(placetype.toLowerCase() + '-add').addEventListener('click', () => {
    var selectedChoice = document.getElementById(placetype.toLowerCase() + '-choices').value
    // figure out what was selected
    var selectedObj = globalstore[placetype][selectedChoice - 1]
    // console.log(document.getElementById(selectChoices).value)
    // Construct an itinerary item
      var temp = document.createElement('li')
      temp.append(selectedObj.name)
      document.getElementById(placetype.toLowerCase() + '-list').append(temp)
    // Append it to the proper place in the DOM
    // Update the map
      // const buildMarker = (type, coords) => {
        var newmarker = buildMarker(placetype.toLowerCase(), selectedObj.place.location)
        newmarker.addTo(map)
  })
}

// setListeners('hotels-add', 'hotels-choices', 'Hotels', 'hotels-list')
// setListeners('restaurants-add', 'restaurants-choices', 'Restaurants', 'restaurants-list')
// setListeners('activities-add', 'activities-choices', 'Activities', 'activities-list')
setListeners('Hotels')
setListeners('Restaurants')
setListeners('Activities')

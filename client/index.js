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
    data.forEach((hotel, index) => {
      var temp = document.createElement('option')
      temp.value = index
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
    globalstore = data;
    console.log(data);
  })
  .catch(console.error)

console.log(globalstore);
var setListeners = function(placetype) {
  document.getElementById(placetype.toLowerCase() + '-add').addEventListener('click', () => {
    var selectedChoice = document.getElementById(placetype.toLowerCase() + '-choices').value
    var selectedObj = globalstore[placetype][selectedChoice]
    var temp = document.createElement('li')
    temp.className = 'list-group-item';
    var button = document.createElement('button');
    button.append('x');
    button.className = 'btn btn-sm btn-danger pull-right';
    temp.append(selectedObj.name)
    temp.append(button);
    document.getElementById(placetype.toLowerCase() + '-list').append(temp)
    var newmarker = buildMarker(placetype.toLowerCase(), selectedObj.place.location)
    newmarker.addTo(map)
    button.onclick = function(){
      temp.remove();
      newmarker.remove();
      map.flyTo({center: selectedObj.place.location, zoom: 13, curve: 2, speed: 0.5});
    }
    map.flyTo({center: selectedObj.place.location, zoom: 15, curve: 2, speed: 0.5});
  })
}

setListeners('Hotels')
setListeners('Restaurants')
setListeners('Activities')

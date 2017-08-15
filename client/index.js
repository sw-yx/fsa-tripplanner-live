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
map.addControl(new mapboxgl.NavigationControl());
var mapData = function (data, targetElement) {
    data.forEach((hotel, index) => {
      var temp = document.createElement('option')
      temp.value = index
      temp.append(hotel.name)
      targetElement.append(temp)
    })
}
var globalstore = {}

var el = x => document.getElementById(x)

fetch('/api/all')
  .then(result => result.json())
  .then(data => {
    // data = { Hotels, Restaurants, Activities }
    var selectH = el('hotels-choices');
    var selectR = el('restaurants-choices');
    var selectA = el('activities-choices');
    mapData(data.Hotels, selectH);
    mapData(data.Restaurants, selectR);
    mapData(data.Activities, selectA);
    globalstore = data;
  })
  .catch(console.error)

var makePopupHTML = (placetype, selectedObj) => {
    switch (placetype) {
      case 'Hotels':
        var popupHTML = `<h3>${selectedObj.name}</h3>`;
        popupHTML += `<p>Address: ${selectedObj.place.address}</p>`;
        popupHTML += `<p>Stars: ${selectedObj.num_stars}</p>`;
        popupHTML += `<p>Amenities: ${selectedObj.amenities}</p>`;
        break;
      case 'Restaurants':
        var popupHTML = `<h3>${selectedObj.name}</h3>`;
        popupHTML += `<p>Address: ${selectedObj.place.address}</p>`;
        popupHTML += `<p>Cuisine: ${selectedObj.cuisine}</p>`;
        popupHTML += `<p>Price: ${Array(selectedObj.price).join('$')}$</p>`;
        popupHTML += `<p>Address: ${selectedObj.place.address}</p>`;
        break;
      default: // Activities
        var popupHTML = `<h3>${selectedObj.name}</h3>`;
        popupHTML += `<p>Address: ${selectedObj.place.address}</p>`;
        popupHTML += `<p>Age Range: ${selectedObj.age_range}</p>`;
        break;
    }
    return popupHTML
}

var setListeners = function(placetype) {
  el(placetype.toLowerCase() + '-add').addEventListener('click', () => {
    var selectedChoice = el(placetype.toLowerCase() + '-choices').value
    var selectedObj = globalstore[placetype][selectedChoice]
    var temp = document.createElement('li')
    temp.className = 'list-group-item';
    var button = document.createElement('button');
    button.append('x');
    button.className = 'btn btn-sm btn-danger pull-right reallysmallbtn';
    temp.append(selectedObj.name)
    temp.append(button);
    el(placetype.toLowerCase() + '-list').append(temp)
    var newmarker = buildMarker(placetype.toLowerCase(), selectedObj.place.location)
    var popup = new mapboxgl.Popup({offset: 25})
        .setHTML(makePopupHTML(placetype, selectedObj))
    newmarker.setPopup(popup)
    newmarker.addTo(map)
    button.onclick = function(){
      temp.remove();
      newmarker.remove();
      map.flyTo({center: selectedObj.place.location, zoom: 13, curve: 2, speed: 0.5});
    }

    //fly to the new marker once done
    map.flyTo({center: selectedObj.place.location, zoom: 15, curve: 2, speed: 0.5});
  })
}

setListeners('Hotels')
setListeners('Restaurants')
setListeners('Activities')


// https://www.mapbox.com/mapbox-gl-js/example/setstyle/
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}
// https://www.mapbox.com/mapbox-gl-js/example/setstyle/
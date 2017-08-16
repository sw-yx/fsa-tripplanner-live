const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");
const makePopup = require("./mappopup");
const {State, Plan} = require('./state');

var el = x => document.getElementById(x) // just a helper function
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
var plan = new Plan()
var currentmarkers = []

fetch('/api/all')
  .then(result => result.json())
  .then(data => { // data = { Hotels, Restaurants, Activities }
    mapData(data.Hotels, el('hotels-choices'));
    mapData(data.Restaurants, el('restaurants-choices'));
    mapData(data.Activities, el('activities-choices'));
    globalstore = data;
  })
  .catch(console.error)

function addPlaceDiv(selectedChoice, Placetype){
    var placetype = Placetype.toLowerCase()
    var selectedObj = globalstore[Placetype][selectedChoice]
    var temp = document.createElement('li')
    temp.className = 'list-group-item';

    //make the button to remove the selected place
    var button = document.createElement('button');
    button.append('x');
    button.className = 'btn btn-sm btn-danger pull-right reallysmallbtn';
    temp.append(selectedObj.name);
    temp.append(button);
    el(placetype + '-list').append(temp)
    var newmarker = buildMarker(placetype, selectedObj.place.location)
    newmarker.setPopup(makePopup(placetype, selectedObj)) // make popup
    newmarker.addTo(map)
    currentmarkers.push(newmarker)
    // make removal possible
    button.onclick = function(){
      temp.remove();
      newmarker.remove();
      plan.removePlaceFromCurrentDay(placetype, selectedChoice)
      map.flyTo({center: selectedObj.place.location, zoom: 13, curve: 2, speed: 0.5});
    }
}

function renderDay(dayplan){
  el('myStuff').innerHTML = `<div>
              <h4>My Hotel</h4>
              <ul class="list-group" id="hotels-list">

              </ul>
            </div>
            <div>
              <h4>My Restaurants</h4>
              <ul class="list-group" id="restaurants-list">

              </ul>
            </div>
            <div>
              <h4>My Activities</h4>
              <ul class="list-group" id="activities-list">

              </ul>
            </div>`;
  ['Hotels', 'Restaurants', 'Activities'].forEach(placetype => {
    var list = dayplan[placetype.toLowerCase()]
    if (list.length > 0)
      list.forEach(li => addPlaceDiv(li, placetype))
  })
}

function renderPlan(){
  currentmarkers.forEach(x => x.remove())
  currentmarkers = []
  el('day-container').innerHTML=''
  plan.days.forEach((x, i) => {
    var temp = document.createElement('button')
    temp.id = "Day-" + i
    temp.className = `btn ${i == plan.currentday ? 'btn-primary' : 'btn-secondary'}  btn-circle`
    temp.append(i + 1)
    temp.addEventListener('click', () => {
      plan.switchDays(i)
      renderPlan()
    })
    el('day-container').appendChild(temp)
  })
  renderDay(plan.getCurDay());
}
renderPlan()

//enable add day button
el('day-add').addEventListener('click', () => {
  plan.addNewDay()
  renderPlan()
})
//enable remove day button
el('day-remove').addEventListener('click', () => {
  plan.removeDay()
  renderPlan()
})

var setListeners = function(Placetype) {
  var placetype = Placetype.toLowerCase()
  // add a new place
  el(placetype + '-add').addEventListener('click', () => {
    var selectedChoice = el(placetype + '-choices').value // position in the array, not really the placeId
    if (plan.addPlaceToCurrentDay(placetype, selectedChoice))
      addPlaceDiv(selectedChoice, Placetype)
    // map.flyTo({center: selectedObj.place.location, zoom: 15, curve: 2, speed: 0.5});
  })
}

// ['Hotels', 'Restaurants', 'Activities'].forEach(x => setListeners(x))
setListeners('Hotels')
setListeners('Restaurants')
setListeners('Activities')

require('./mapmenu') // add menu to mapbox, just for fun
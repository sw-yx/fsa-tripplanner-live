const mapboxgl = require("mapbox-gl");

var makePopupHTML = (Placetype, selectedObj) => {
    var popupHTML = `<h3>${selectedObj.name}</h3>`;
    popupHTML += `<p>Address: ${selectedObj.place.address}</p>`;
    switch (Placetype) {
      case 'Hotels':
        popupHTML += `<p>Stars: ${selectedObj.num_stars}</p>`;
        popupHTML += `<p>Amenities: ${selectedObj.amenities}</p>`;
        break;
      case 'Restaurants':
        popupHTML += `<p>Cuisine: ${selectedObj.cuisine}</p>`;
        popupHTML += `<p>Price: ${Array(selectedObj.price).join('$')}$</p>`;
        break;
      default: // Activities
        popupHTML += `<p>Age Range: ${selectedObj.age_range}</p>`;
        break;
    }
    return popupHTML
}

function makePopup(placetype, selectedObj) {
    return new mapboxgl.Popup({offset: 25})
          .setHTML(makePopupHTML(placetype, selectedObj))
}
module.exports = makePopup
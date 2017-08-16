// START https://www.mapbox.com/mapbox-gl-js/example/setstyle/
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}
// END https://www.mapbox.com/mapbox-gl-js/example/setstyle/
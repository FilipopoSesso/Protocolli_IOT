$(document).ready(() => {
  const client = mqtt.connect("wss://test.mosquitto.org:8081");

  onConnect(client);
  onMessage(client);
});

//Base Layer with Open Street Maps
var baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

//Construct the Map Object
var map = new ol.Map({
  target: "map",
  layers: [baseMapLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([11.3343, 45.565]),
    zoom: 10, //Initial Zoom Level
  }),
});

//Set up an  Style for the marker note the image used for marker
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(
    /** @type {module:ol/style/Icon~Options} */ ({
      anchor: [0.5, 16],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "Drone-PNG.png",
    })
  ),
});

//Adding a marker on the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([80.24586, 12.9859])),
});

marker.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
  features: [marker],
});

var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

// add style to Vector layer style map
map.addLayer(markerVectorLayer);

function updateCoordinate(item) {
  var featureToUpdate = marker;

  var coord = ol.proj.fromLonLat([item.position.lon, item.position.lat]);

  featureToUpdate.getGeometry().setCoordinates(coord);
}

function onConnect(client) {
  client.on("connect", function () {
    console.log("Connected");
    client.subscribe("v1/drones/*/currentposition");
  });
}

function onMessage(client) {
  client.on("message", function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    parseData = JSON.parse(message)
    updateCoordinate(parseData.data);
  });
}

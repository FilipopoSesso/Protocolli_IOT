
import Package as pk

def openMap():
  f = open('Map.html','w')

  message = """
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.11.0/css/ol.css" type="text/css">
      <style>
        .map {
          height: 1000px;
          width: 100%;
        }
      </style>
      <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.11.0/build/ol.js"></script>
      <title>Drones Map</title>
    </head>
    <body>
      <div id="map" class="map"></div>
      <script type="text/javascript">
        
        var baseMapLayer = new ol.layer.Tile({
          source: new ol.source.OSM(),
        });
        
        var map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([11.55, 45.50]),
            zoom: 12
          })
        });
        
        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon(
            /** @type {module:ol/style/Icon~Options} */ ({
              anchor: [0.5, 16],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "image/icon.png",
            })
          ),
        });
        
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

          var coord = ol.proj.fromLonLat([item.lon, item.lat]);

          featureToUpdate.getGeometry().setCoordinates(coord);
        }
        
      </script>
    </body>
  </html>
  """

  f.write(message)
  f.close()

  pk.wb.open_new_tab('Map.html')

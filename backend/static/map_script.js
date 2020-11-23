document.addEventListener('DOMContentLoaded', () => {

    // Set up map + controls
    let map = L.map('map', {
        minZoom: 4,
        preferCanvas: true
    }).setView([50.672525, -86.353084], 7);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const editableItems = new L.FeatureGroup();
    map.addLayer(editableItems);

    const drawControl = new L.Control.Draw({
        position: 'bottomright',
        draw: {
            marker: false,
            circlemarker: false,
            circle: false,
            rectangle: false,
            polyline: false,
            polygon: false
        },
        edit: {
            featureGroup: editableItems,
            remove: false
        }
    });

    map.addControl(drawControl);

    // Add polygon to map
    const zoneData = JSON.parse(document.getElementById('zone-data').textContent);
    const zoneGeoJSON = JSON.parse(zoneData.geo_json);
    const swap = ([a, b]) => [b, a];

    const coordinates = [];
    for (let coords of zoneGeoJSON.geometry.coordinates[0]) {
        coordinates.push(swap(coords));
    }

    const polygon = L.polygon(coordinates);
    editableItems.addLayer(polygon);

    map.fitBounds(polygon.getBounds());

    map.on('draw:edited', async (e) => {
        e.layers.eachLayer((layer) => {
            document.querySelector('#id_geo_json').value = JSON.stringify(layer.toGeoJSON());
        });
    });
});

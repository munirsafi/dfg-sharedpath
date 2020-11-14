//@ts-nocheck
import L from 'leaflet';
import * as turf from '@turf/turf';

export default function Map() {
var mapElement=document.getElementById("map");
var map = L.map(mapElement).setView([43.6532, -79.3832], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var poly = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[
[-91,54],
[-86,53],
[-83,52],
[-84,50],
[-90,51]]]}}]};

var polyLayer = L.geoJSON(poly).addTo(map);


// GRID
var bbox = polyLayer.getBounds().toBBoxString().split(',').map(Number);
console.log(bbox);
var cellSide = 20;
var mask = polyLayer.toGeoJSON().features[0];
var options = {
    units: 'kilometers',
    mask: mask
};

var squareGrid = turf.squareGrid(bbox, cellSide, options);

var gridLayer = L.geoJSON(squareGrid, {color: "#008800", weight: 1, fill:0}).addTo(map);
map.fitBounds(gridLayer.getBounds());

return(<div id="map" style="width: 600px; height: 400px"></div>)
}
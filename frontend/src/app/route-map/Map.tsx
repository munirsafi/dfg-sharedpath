//@ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import * as turf from '@turf/turf';
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

import './Map.scss';
import { ontarioBoundary } from './OntarioBoundary';

import Authentication from '../../services/Authentication';
import NavBar from '../core/navbar/NavBar';

export default function Map() {

  let leafletMap;
  let drawer = leafletDraw;

  useEffect(() => {
    const mapElement = document.getElementById('map') as HTMLElement;
    leafletMap = L.map(mapElement, {
      preferCanvas: true
    }).setView([43.6532, -79.3832], 11);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    const drawnItems = new L.FeatureGroup();
    leafletMap.addLayer(drawnItems);

    if (Authentication.status() === true) {
      const drawControl = new L.Control.Draw({
        position: 'bottomright',
        draw: {
          marker: false,
          circlemarker: false,
          circle: false,
          rectangle: false,
          polyline: false
        },
        edit: {
          featureGroup: drawnItems
        }
      });
      leafletMap.addControl(drawControl);
    }

    leafletMap.on('draw:created', function (e) {
      const type = (e as L.DrawEvents.Created).layerType,
        layer = (e as L.DrawEvents.Created).layer;

      if (type === 'polygon') {
        const geojson = layer.toGeoJSON();
        console.log(geojson);
      }

      drawnItems.addLayer(layer);
    });

    const polyLayer = L.geoJSON(ontarioBoundary);


    // // GRID for all of Ontario
    const bbox: any = polyLayer.getBounds().toBBoxString().split(',').map(Number);
    const cellSide = 20;

    const mask = polyLayer.toGeoJSON().features[0];
    const options: any = {
      units: 'kilometers',
      mask: mask
    };

    const squareGrid: any = turf.squareGrid(bbox, cellSide, options);
    const gridLayer = L.geoJSON(squareGrid, {
      color: "#ffffff",
      weight: 0.25,
      fill: 0
    }).addTo(leafletMap);


    const polyGroups = [{
      userID: 1,
      geoJSON: {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-91, 54],
              [-86, 53],
              [-83, 52],
              [-84, 50],
              [-90, 51]
            ]
          ]
        }
      },
      communityInfo: {
        community: 'Testing',
        community_email: 'test@test.com'
      }
    }, {
      userID: 2,
      geoJSON: {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-87, 52],
              [-84, 54],
              [-84.5, 55],
              [-89, 53]
            ]
          ]
        },
      },
      communityInfo: {
        community: 'Testing 2',
        community_phone: '+9999999999',
        community_link: 'https://google.ca/'
      }
    }];

    for (let area of polyGroups) {

      L.geoJSON(area.geoJSON, {
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
        weight: 0.5,
        fill: 0.2
      }).bindPopup(`${area.communityInfo.community_name} <br/> ${area.communityInfo.community_email}`)
        .addTo(leafletMap);

      var polygon = L.polygon(area.geoJSON.geometry.coordinates);
      console.log(polygon);
      drawnItems.addLayer(polygon);

    }

    const GridAreas = L.geoJson(squareGrid, {
      style: function (feature) {
        return {
          stroke: false,
          fillColor: 'FFFFFF',
          fillOpacity: 0
        };
      },
      onEachFeature: function (feature, layer) {

        const communities = []

        for (let zone of polyGroups) {

          const popupOptions = { maxWidth: 200 };
          //feature.properties.ObjectID=i;

          const overlap = turf.booleanOverlap(zone.geoJSON, feature);
          const contains = turf.booleanContains(zone.geoJSON, feature);

          if (overlap || contains) {
            communities.push(zone.communityInfo);
          }
        }

        let popupText = '';
        for (let i = 0, l = communities.length; i < l; i++) {
          const community = communities[i];
          popupText += `<b>${community.community}</b><br/>`;
          if (community.community_email) popupText += `Email: ${community.community_email}<br/>`;
          if (community.community_phone) popupText += `Phone: ${community.community_phone}<br/>`;
          if (community.community_link) popupText += `Policy Link: <a href='${community.community_link}' target='_blank'>${community.community_link}</a><br/>`;
          if (i !== l - 1) popupText += '<br/><hr/><br/>';
        }
        if (popupText !== '') layer.bindPopup(popupText);

      }
    }).addTo(leafletMap);

    L.control.scale().addTo(leafletMap);

    leafletMap.fitBounds(gridLayer.getBounds());
  }, []);

  return (
    <div style={{ width: 100 + '%', height: 100 + '%' }}>
      <NavBar />
      <div id="map"></div>
    </div>
  );
}
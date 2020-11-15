import React from 'react';
import { useEffect } from 'react';
import * as turf from '@turf/turf';
import L from 'leaflet';

import './Map.scss';

export function Map() {

    let leafletMap;

    useEffect(() => {
        const mapElement = document.getElementById('map') as HTMLElement;
        leafletMap = L.map(mapElement).setView([43.6532, -79.3832], 11);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        const poly: any = {
            "type": "FeatureCollection",
            "features": [{
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
            }]
        };

        const polyLayer = L.geoJSON(poly).addTo(leafletMap);

        // // GRID
        const bbox: any = polyLayer.getBounds().toBBoxString().split(',').map(Number);
        console.log(bbox);
        const cellSide = 20;
        // @ts-ignore
        const mask = polyLayer.toGeoJSON().features[0];
        const options: any = {
            units: 'kilometers',
            mask: mask
        };

        const squareGrid: any = turf.squareGrid(bbox, cellSide, options);
        const gridLayer = L.geoJSON(squareGrid, {
            // @ts-ignore
            color: "#008800",
            weight: 1,
            fill: 0
        }).addTo(leafletMap);
        leafletMap.fitBounds(gridLayer.getBounds());
    }, []);

    return (<div id="map"></div>);
}
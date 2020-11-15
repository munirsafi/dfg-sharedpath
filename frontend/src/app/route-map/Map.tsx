import React, { useEffect } from 'react';

import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

import * as turf from '@turf/turf';

import './Map.scss';
import Authentication from '../../services/Authentication';

export default function Map() {

    let leafletMap;
    // @ts-ignore
    let drawer = leafletDraw;

    useEffect(() => {
        const mapElement = document.getElementById('map') as HTMLElement;
        leafletMap = L.map(mapElement, { preferCanvas: true }).setView([43.6532, -79.3832], 11);

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
                // here you got the polygon points
                // @ts-ignore
                var points = layer._latlngs;
                console.log(points);

                // here you can get it in geojson format
                var geojson = layer.toGeoJSON();
                console.log(geojson);
            }
            // Do whatever else you need to. (save to db, add to map etc)
      drawnItems.addLayer(layer);
  });

        const poly: any = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -88.9453125,
                                56.992882804633986
                              ],
                              [
                                -95.537109375,
                                53.014783245859235
                              ],
                              [
                                -95.712890625,
                                48.86471476180277
                              ],
                              [
                                -90.263671875,
                                47.57652571374621
                              ],
                              [
                                -88.505859375,
                                47.69497434186282
                              ],
                              [
                                -84.638671875,
                                46.13417004624326
                              ],
                              [
                                -82.79296874999999,
                                44.715513732021336
                              ],
                              [
                                -83.583984375,
                                42.16340342422401
                              ],
                              [
                                -82.79296874999999,
                                41.244772343082076
                              ],
                              [
                                -78.75,
                                42.68243539838623
                              ],
                              [
                                -78.486328125,
                                43.26120612479979
                              ],
                              [
                                -76.37695312499999,
                                43.26120612479979
                              ],
                              [
                                -73.564453125,
                                45.213003555993964
                              ],
                              [
                                -74.619140625,
                                46.07323062540835
                              ],
                              [
                                -75.76171875,
                                45.89000815866184
                              ],
                              [
                                -78.31054687499999,
                                46.6795944656402
                              ],
                              [
                                -78.837890625,
                                47.45780853075031
                              ],
                              [
                                -78.92578124999999,
                                51.6180165487737
                              ],
                              [
                                -80.5078125,
                                55.62799595426723
                              ],
                              [
                                -88.9453125,
                                56.992882804633986
                              ]
                        ]
                    ]
                }
            }]
        };

        const polyLayer = L.geoJSON(poly);

        const poly1: any = {
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

        const poly2: any = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [-87, 52],
                            [-84, 54],
                            [-84.5, 55],
                            [-89, 53],
                        ]
                    ]
                }
            }]
        };


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
            color: "#ffffff",
            weight: 0.25,
            fill: 0
        }).addTo(leafletMap);

        const polyNation1 = L.geoJSON(poly1,
            {// @ts-ignore
                color: "blue",
                weight: 0.5,
                fill: 0.2
            }).bindPopup("Example Nation 1 </br> Nation1@gmail.com").
            addTo(leafletMap);
            
            // for (const grid of squareGrid)
            //     {const areOverlapping =  turf.booleanOverlap(poly1,grid);
            //         if (areOverlapping){
            //             const flagCheck=true;
            //             break;
            //         }
            //     }
            // for each polygon in squaregrid feature collection:
                
            //     if turf.booleanOverlap(polyNation1,gridbox)
            //     then color=blue;

            const polyNation2 = L.geoJSON(poly2,
                {// @ts-ignore
                    color: "green",
                    weight: 0.5,
                    fill: 0.2
                }).bindPopup("Example Nation 2 </br> Nation2@gmail.com").
                addTo(leafletMap);

        L.control.scale().addTo(leafletMap);
        
        leafletMap.fitBounds(gridLayer.getBounds());
    }, []);

    return <div id="map"></div>;
}
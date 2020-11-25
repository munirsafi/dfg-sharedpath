//@ts-nocheck
import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

import './Map.scss';
import { ontarioBoundary } from './OntarioBoundary';

import LandZoneAPI from '../../services/Landzones';
import Authentication from '../../services/Authentication';
import NavBar from '../core/navbar/NavBar';
import Sidebar from './Sidebar/Sidebar';

export default function Map() {

    const [zones, setZones] = useState([]);
    const [leafletMap, setLeafletMap] = useState();
    const [squareGrid, setSquareGrid] = useState();
    const [editableItems,] = useState(new L.FeatureGroup());
    const [drawnItems,] = useState(new L.FeatureGroup());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let drawer = leafletDraw;

    // Inline function to call when needing to fetch zone objects again
    const fetchZones = async () => {
        const landZones = await LandZoneAPI.get();
        setZones(landZones);
    }

    
    const openSidebar = () => {
        const sideBar = document.querySelector('.sidebar');
        sideBar.style.display = 'block';
    }

    useEffect(() => {
        if (leafletMap === undefined) {
            // Create map object
            let map = L.map('map', {
                minZoom: 4,
                preferCanvas: true
            }).setView([50.672525, -86.353084], 7);

            // Set tile layer
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add the feature groups which will contain editable and
            // non-editable polygon shapes
            map.addLayer(drawnItems);
            map.addLayer(editableItems);

            // Check if authenticated to add the control toolbar, and to
            // set which feature group is modifiable
            if (Authentication.status() === true) {
                const drawControl = new L.Control.Draw({
                    position: 'bottomright',
                    draw: {
                        marker: false,
                        circlemarker: false,
                        circle: false,
                        rectangle: false,
                        polyline: false,
                        polygon: true
                    },
                    edit: {
                        featureGroup: editableItems
                    }
                });

                map.addControl(drawControl);
            }

            // Set the shape of ontario and create the grid for it
            const ontarioShape = L.geoJSON(ontarioBoundary);
            const bbox: any = ontarioShape.getBounds().toBBoxString().split(',').map(Number);
            const cellSide = 20;

            const mask = ontarioShape.toGeoJSON().features[0];
            const options: any = {
                units: 'kilometers',
                mask: mask
            };

            const gridSquare: any = turf.squareGrid(bbox, cellSide, options);
            const gridLayer = L.geoJSON(gridSquare, {
                weight: 0,
                fill: 0
            }).addTo(map);

            // Add the zoom tools to the map and zoom to fit Ontario to the screen
            L.control.scale().addTo(map);
            map.fitBounds(gridLayer.getBounds());

            // Declare our different map watch events for:
            // - Drawing creation start/end, modification start/end, deletion start/end
            map.on('draw:created', async (e) => {
                const type = (e as L.DrawEvents.Created).layerType,
                    layer = (e as L.DrawEvents.Created).layer;

                if (type === 'polygon') {
                    const geojson = layer.toGeoJSON();
                    const newZone = {
                        geoJSON: geojson
                    }
                    await LandZoneAPI.submit([newZone]);
                    fetchZones();
                }

                layer.setStyle({
                    fillOpacity: 0,
                    weight: 0
                });

                editableItems.addLayer(layer);
            });

            map.on('draw:edited', async (e) => {
                const landZones = []

                e.layers.eachLayer((layer) => {
                    const zone = {
                        uuid: layer.id,
                        geoJSON: layer.toGeoJSON()
                    }
                    landZones.push(zone);
                });

                await LandZoneAPI.update(landZones);
                fetchZones();
            });

            map.on('draw:deleted', async (e) => {
                const landZones = [];

                e.layers.eachLayer((layer) => {
                    landZones.push(layer.id);
                });

                await LandZoneAPI.delete(landZones);
                fetchZones();
            });

            map.on('draw:deletestart', () => {
                editableItems.eachLayer((layer) => {
                    layer.setStyle({
                        fill: true,
                        fillColor: '#FF0000',
                        fillOpacity: 0.15
                    });
                    layer.bringToFront();
                });
            });

            map.on('draw:deletestop', () => {
                editableItems.eachLayer((layer) => {
                    layer.setStyle({
                        fill: false
                    });
                    layer.bringToBack();
                });
            });

            map.on('draw:editstart draw:drawstart', (e) => {
                gridLayer.setStyle({
                    color: "#ffffff",
                    weight: 0.25
                });

                map.off('click');
            });

            map.on('draw:editstop draw:drawstop', (e) => {
                gridLayer.setStyle({
                    weight: 0
                });

                if (L.Browser.mobile) {
                    map.on('dblclick', openSidebar)
                } else {
                    map.on('click', openSidebar);
                }
            });

            // Open sidebar when a user clicks once on desktop, or doubletaps
            // on a mobile phone
            if (L.Browser.mobile) {
                map.on('dblclick', openSidebar)
            } else {
                map.on('click', openSidebar);
            }

            // Finally, fetch the zones from the API and set the map and
            // grid in our state
            fetchZones();
            setLeafletMap(map);
            setSquareGrid(gridSquare);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (leafletMap && zones) {

            // Before adding new layers, reset all our existing layers
            editableItems.clearLayers();

            // Loop through all returned zones and add them into the 
            // drawn or editable layer depending on ownership
            for (let area of zones) {
                const swap = ([a, b]) => [b, a];
                const coordinates = [];

                for (let coords of area.geoJSON.geometry.coordinates[0]) {
                    coordinates.push(swap(coords));
                }

                const polygon = L.polygon(coordinates, { fill: 0, weight: 0 });
                polygon.id = area.geoJSON.properties.uuid;
                polygon.owner = area.owner;

                const user = Authentication.getInfo();

                if (user !== null) {
                    if (polygon.owner === user.uuid) {
                        editableItems.addLayer(polygon);
                    } else {
                        drawnItems.addLayer(polygon);
                    }
                } else {
                    drawnItems.addLayer(polygon);
                }
            }

            // Delete our old grid markers layer
            leafletMap.eachLayer((layer) => {
                if (layer.layerId === 'gridMarkers') leafletMap.removeLayer(layer);
            });

            // Create the grid markers layer that will contain the popup info
            // for every square that was created in Ontario
            const areaGrid = L.geoJson(squareGrid, {
                style: {
                    stroke: false,
                    fillColor: 'FFFFFF',
                    fillOpacity: 0
                },
                onEachFeature: (feature, layer) => {
                    const communitiesHash = {};
                    const communities = [];

                    for (let area of zones) {
                        const overlap = turf.booleanOverlap(area.geoJSON, feature);
                        const contains = turf.booleanContains(area.geoJSON, feature);

                        if (overlap || contains) {
                            if (communitiesHash.hasOwnProperty(area.communityInfo.community + area.communityInfo.community_email) === false) {
                                communities.push(area.communityInfo);
                                communitiesHash[area.communityInfo.community + area.communityInfo.community_email] = true;
                            }
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
                    if (popupText !== '') {
                        layer.bindPopup(popupText);

                        layer.on('mouseover', function (e) {
                            this.openPopup();
                        });

                        layer.on('mouseout', function (e) {
                            this.closePopup();
                        });
                    }
                }
            });
            areaGrid.layerId = 'gridMarkers';
            areaGrid.addTo(leafletMap);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zones]);

    return (
        <div style={{ width: 100 + '%', height: 100 + '%' }}>
            <NavBar />
            <Sidebar zones={zones} />
            <div id="map"></div>
        </div>
    );
}
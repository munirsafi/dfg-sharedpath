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

    let drawer = leafletDraw;

    const fetchZones = async () => {
        const landZones = await LandZoneAPI.get();
        setZones(landZones);
    }

    useEffect(() => {
        const mapElement = document.getElementById('map') as HTMLElement;
        if (leafletMap === undefined) {
            let map = L.map(mapElement, {
                minZoom: 4,
                preferCanvas: true
            }).setView([50.672525, -86.353084], 7);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            fetchZones();
            setLeafletMap(map);
        }
    }, []);

    useEffect(() => {
        if (leafletMap && zones) {
            const editableItems = new L.FeatureGroup();
            const drawnItems = new L.FeatureGroup();

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
                leafletMap.addControl(drawControl);
            }


            leafletMap.on('draw:created', (e) => {
                const type = (e as L.DrawEvents.Created).layerType,
                    layer = (e as L.DrawEvents.Created).layer;

                if (type === 'polygon') {
                    const geojson = layer.toGeoJSON();
                    const newZone = {
                        geoJSON: geojson
                    }
                    LandZoneAPI.submit([newZone]);
                }

                layer.setStyle({
                    fillOpacity: 0,
                    weight: 0
                });

                editableItems.addLayer(layer);
            });

            leafletMap.on('draw:edited', (e) => {
                const landZones = []

                e.layers.eachLayer((layer) => {
                    const zone = {
                        uuid: layer.id,
                        geoJSON: layer.toGeoJSON()
                    }
                    landZones.push(zone);
                });

                LandZoneAPI.update(landZones);
            });

            leafletMap.on('draw:deleted', (e) => {
                const landZones = [];

                e.layers.eachLayer((layer) => {
                    landZones.push(layer.id);
                });

                LandZoneAPI.delete(landZones);
            });

            leafletMap.on('draw:deletestart', () => {
                editableItems.eachLayer((layer) => {
                    layer.setStyle({
                        fill: true,
                        fillColor: '#FF0000',
                        fillOpacity: 0.15
                    });
                    layer.bringToFront();
                });
            });

            leafletMap.on('draw:deletestop', () => {
                editableItems.eachLayer((layer) => {
                    layer.setStyle({
                        fill: false
                    });
                    layer.bringToBack();
                });
            });

            leafletMap.on('draw:editstart draw:drawstart', (e) => {
                gridLayer.setStyle({
                    color: "#ffffff",
                    weight: 0.25
                });
            });

            leafletMap.on('draw:editstop draw:drawstop', (e) => {
                gridLayer.setStyle({
                    weight: 0,
                });
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
                weight: 0,
                fill: 0
            }).addTo(leafletMap);

            L.geoJson(squareGrid, {
                style: {
                    stroke: false,
                    fillColor: 'FFFFFF',
                    fillOpacity: 0
                },
                onEachFeature: (feature, layer) => {

                    const communities = [];

                    for (let area of zones) {
                        const overlap = turf.booleanOverlap(area.geoJSON, feature);
                        const contains = turf.booleanContains(area.geoJSON, feature);

                        if (overlap || contains) {
                            communities.push(area.communityInfo);
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

                    layer.on('click', () => {
                        const sideBar = document.querySelector('.sidebar');
                        sideBar.style.display = 'block';
                    });
                }
            }).addTo(leafletMap);

            L.control.scale().addTo(leafletMap);
            leafletMap.fitBounds(gridLayer.getBounds());
        }
    }, [zones]);

    return (
        <div style={{ width: 100 + '%', height: 100 + '%' }}>
            <NavBar />
            <Sidebar zones={zones} />
            <div id="map"></div>
        </div>
    );
}
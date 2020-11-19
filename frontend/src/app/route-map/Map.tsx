//@ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import * as turf from '@turf/turf';
import L, { polygon } from 'leaflet';
import leafletDraw from 'leaflet-draw';

import './Map.scss';
import { ontarioBoundary } from './OntarioBoundary';

import Authentication from '../../services/Authentication';
import NavBar from '../core/navbar/NavBar';
import { FeatureGroup } from 'react-leaflet';

export default function Map() {

    let leafletMap;
    let drawer = leafletDraw;

    const hideSidebar = () => {
        const sideBar = document.querySelector('.sidebar');
        sideBar.style.display = 'none';
    };

    const polyGroups = [{
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

        for (let area of polyGroups) {
            const swap: ([a, b]) => [b, a];
            const coordinates = [];

            for (let coords of area.geoJSON.geometry.coordinates[0]) {
                coordinates.push(swap(coords));
            }

            const polygon = L.polygon(coordinates)
            drawnItems.addLayer(polygon);
        }

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

        const GridAreas = L.geoJson(squareGrid, {
            style: function (feature) {
                return {
                    stroke: false,
                    fillColor: 'FFFFFF',
                    fillOpacity: 0
                };
            },
            onEachFeature: function (feature, layer) {

                const communities = [];

                for (let zone of polyGroups) {
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
    }, []);

    return (
        <div style={{ width: 100 + '%', height: 100 + '%' }}>
            <NavBar />
            <div className='sidebar'>
                <div className='close-sidebar' onClick={() => hideSidebar()}></div>
                <div className='sidebar-title'>Ontario Native Groups</div>
                {polyGroups.map((group, index) => {
                    return (<div className='community-info'>
                        <span className='name'>{group.communityInfo.community}</span>
                        { group.communityInfo.community_email ?
                            <span>Email Address: <a href={'mailto:' + group.communityInfo.community_email}>{group.communityInfo.community_email}</a></span>
                            : null}
                        { group.communityInfo.community_phone ?
                            <span>Phone Number: < a href={'tel:' + group.communityInfo.community_phone}>{group.communityInfo.community_phone}</a></span>
                            : null}
                        { group.communityInfo.community_link ?
                            <span>Policy Link: <a href={group.communityInfo.community_link}>{group.communityInfo.community_link}</a></span>
                            : null}
                    </div>);
                })}
            </div>
            <div id="map"></div>
        </div>
    );
}
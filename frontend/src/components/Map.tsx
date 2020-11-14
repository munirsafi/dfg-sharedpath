import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon, FeatureGroup, Marker, Popup, Circle} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import * as turf from '@turf/turf';
import { ShapeFile } from "react-leaflet-shapefile";
import "../scss/Map.scss";

// const Component = () => (
//   <FeatureGroup>
//     <EditControl
//       position='topright'
//       onEdited={this._onEditPath}
//       onCreated={this._onCreate}
//       onDeleted={this._onDeleted}
//       draw={{
//         rectangle: false
//       }}
//     />
//     <Circle center={[51.51, -0.06]} radius={200} />
//   </FeatureGroup>
// );

export default function MapApp() {
  return (


    <MapContainer center={[50.040384, -85.888311]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polygon pathOptions={{ color: 'purple' }} positions={[[54, -91],
      [53, -86],
      [52, -83],
      [50, -84],
      [51, -90]]} />

      <Polygon pathOptions={{ color: 'green' }} positions={[[51, -87],
      [52, -85],
      [55, -86],
      [54, -87]]} />
      {/* <Marker position = {[52,-87]}>
    <Popup>
        <b>Nation 1</b> <br /> Contact info. <br/> Phone #.
      </Popup>
    </Marker> */}
    </MapContainer >
  );
}
//@ts-nocheck

// import React from 'react';
// import shp from "shpjs";
// import 'leaflet/dist/leaflet.css';
// import { useLeaflet, MapContainer, TileLayer, Polygon, LayersControl, FeatureGroup, Marker, Popup, Circle, GeoJSON} from 'react-leaflet';
// import L from 'leaflet';
// import { EditControl } from "react-leaflet-draw";
// import * as turf from '@turf/turf';
// import { ShapeFile } from "react-leaflet-shapefile";
// import "../scss/Map.scss";

// import zipUrl from './provinces.zip';


// const { BaseLayer, Overlay } = LayersControl;

// function Shapefile({ zipUrl }) {
//   const { map } = useLeaflet();

//   useEffect(() => {
//     const geo = L.geoJson(
//       { features: [] },
//       {
//         onEachFeature: function popUp(f, l) {
//           var out = [];
//           if (f.properties) {
//             for (var key in f.properties) {
//               out.push(key + ": " + f.properties[key]);
//             }
//             l.bindPopup(out.join("<br />"));
//           }
//         }
//       }
//     ).addTo(map);

//     shp(zipUrl).then(function (data) {
//       geo.addData(data);
//     });
//   }, []);

//   return null;
// }


// // const Component = () => (
// //   <FeatureGroup>
// //     <EditControl
// //       position='topright'
// //       onEdited={this._onEditPath}
// //       onCreated={this._onCreate}
// //       onDeleted={this._onDeleted}
// //       draw={{
// //         rectangle: false
// //       }}
// //     />
// //     <Circle center={[51.51, -0.06]} radius={200} />
// //   </FeatureGroup>
// // );

// export default function MapApp() {
//   return (


//     <MapContainer center={[50.040384, -85.888311]} zoom={5}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Polygon pathOptions={{ color: 'purple' }} positions={[[54, -91],
//       [53, -86],
//       [52, -83],
//       [50, -84],
//       [51, -90]]} />

//       <Polygon pathOptions={{ color: 'green' }} positions={[[51, -87],
//       [52, -85],
//       [55, -86],
//       [54, -87]]} />

// <Shapefile zipUrl={zipUrl} />

//       {/* <ShapeFile data={'./provinces/lpr_000b16a_e.shp'} 
//       /> */}

// {/* onEachFeature={this.onEachFeature} isArrayBufer={true} */}


// {/* <Overlay checked name='Feature group'>
//         <FeatureGroup>
//           <ShapeFile data={'provinces.zip'}/>
//         </FeatureGroup>
//       </Overlay> */}


//       {/* <Marker position = {[52,-87]}>
//     <Popup>
//         <b>Nation 1</b> <br /> Contact info. <br/> Phone #.
//       </Popup>
//     </Marker> */}


//     </MapContainer >
//   );
// }
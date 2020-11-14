// import React from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Polygon, FeatureGroup, Marker, Popup, Circle} from 'react-leaflet';
// import { EditControl } from "react-leaflet-draw"

// interface Props {
//     name?: string;
// }

// interface State {
//     name?: string;
// }



// export default class EditControlExample extends React.Component<Props,State> {
//     state: State = {
//         name: this.props.name
//     }

//     _onEdited = (e) => {

//         let numEdited = 0;
//         e.layers.eachLayer( (layer) => {
//           numEdited += 1;
//         });
//         console.log(`_onEdited: edited ${numEdited} layers`, e);
    
//         this._onChange();
//       }
    
//       _onCreated = (e) => {
//         let type = e.layerType;
//         let layer = e.layer;
//         if (type === 'marker') {
//           // Do marker specific actions
//           console.log("_onCreated: marker created", e);
//         }
//         else {
//           console.log("_onCreated: something else created:", type, e);
//         }
//         // Do whatever else you need to. (save to db; etc)
    
//         this._onChange();
//       }
    
//       _onDeleted = (e) => {
    
//         let numDeleted = 0;
//         e.layers.eachLayer( (layer) => {
//           numDeleted += 1;
//         });
//         console.log(`onDeleted: removed ${numDeleted} layers`, e);
    
//         this._onChange();
//       }
    
//       _onMounted = (drawControl) => {
//         console.log('_onMounted', drawControl);
//       }
    
//       _onEditStart = (e) => {
//         console.log('_onEditStart', e);
//       }
    
//       _onEditStop = (e) => {
//         console.log('_onEditStop', e);
//       }
    
//       _onDeleteStart = (e) => {
//         console.log('_onDeleteStart', e);
//       }
    
//       _onDeleteStop = (e) => {
//         console.log('_onDeleteStop', e);
//       }

//     render() {
//         return <div>
//                     <h1>{this.props.name}</h1>
//                 </div>
//     }
// }

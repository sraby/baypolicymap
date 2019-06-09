import React from 'react';
import { Map, Pane, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import data from './data.json';
//import './App.css';

const getColorTotal = function(d) {
  return d < 1 ? '#e1dbca' :
         d < 3 ? '#F2E0BF' :
         d < 5 ? '#F5D290' :
         d < 11 ? '#F4B030' :
         '#e49d1b';
};

const getColor = function(d) {
  return d < 1 ? '#E2DDCF' : 
  '#F9BB56';
}


class App extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -122.6,
    zoom: 9,
    tileURL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    style: function (geoJsonFeature) {
      return {
        fillColor: getColorTotal(geoJsonFeature.properties.total),
        weight: 1,
        opacity: 0.5,
        color: '#fff',
        fillOpacity: 0.9
      } ;
    },
  }

  this.policyCodeNames = Object.keys(data.features[0].properties).filter(x => !["cartodb_id","city","total"].includes(x));

}

// JSON Properties: 
  // "cartodb_id": number,
  // "city": string,
  // "condoconv": 0 | 1, "justcause": 0 | 1, "stabilizat": 0 | 1, "reviewboar": 0 | 1, "mobilehome": 0 | 1,
  // "sropres": 0 | 1, "foreclosur": 0 | 1, "jobshousin": 0 | 1, "commercial": 0 | 1, "trustfund": 0 | 1,
  // "inclusiona": 0 | 1, "densitybon": 0 | 1, "landtrust": 0 | 1, "firstsourc": 0 | 1,
  // "total": number


render() {

  const position = [this.state.lat, this.state.lng];

    return (
      <Map center={position} zoom={this.state.zoom} zoomControl={false} >
        <TileLayer 
          className="basemap-layer"
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        <Pane>
          <TileLayer 
            className="reference-layer"
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
        </Pane>
        <GeoJSON 
          data={data} 
          style={this.state.style} />
        <ZoomControl position='topright' />
      </Map>
    );

  }
}

export default App;

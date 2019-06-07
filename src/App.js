import React from 'react';
import { Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import data from './data.json';
//import './App.css';

class App extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -122.6,
    zoom: 9,
    tileURL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }

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
        <TileLayer url={this.state.tileURL} attribution={this.state.attribution} />
        <GeoJSON data={data} />
        <ZoomControl position='topright' />
      </Map>
    );

  }
}

export default App;

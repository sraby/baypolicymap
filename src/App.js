import React from 'react';
import { Map, TileLayer, GeoJSON} from 'react-leaflet';
import data from './data.json';
//import './App.css';

class App extends React.Component {

constructor() {
  super()
  this.state = {
    lat: 37.7,
    lng: -123.1,
    zoom: 9,
    tileURL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
}

render() {

  const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer url={this.state.tileURL} attribution={this.state.attribution} subdomains={'abcd'} />
        <GeoJSON data={data} />
      </Map>
    );
  }
}

export default App;
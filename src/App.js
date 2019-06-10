import React from 'react';
import { Map, Pane, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import mapData from './data/mapData.json';

import './App.scss'

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
    focusCity: null,
    focusPolicy: "total",
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

  this.policyList = [
     {code: "condoconv", name:"Condominium conversion regulations"},
     {code: "justcause", name:"Just Cause Eviction Ordinance"},
     {code: "stabilizat", name:"Rent Stabilization or Rent Control"},
     {code: "reviewboar", name:"Rent Review Board and/or Mediation"},
     {code: "mobilehome", name:"Mobile home rent control"},
     {code: "sropres", name:"SRO preservation"},
     {code: "foreclosur", name:"Foreclosure assistance"},
     {code: "jobshousin", name:"Jobs-housing linkage fee"},
     {code: "commercial", name:"Commerical linkage fee"},
     {code: "trustfund", name:"Housing trust fund"},
     {code: "inclusiona", name:"Inclusionary zoning"},
     {code: "densitybon", name:"Density bonus ordinance"},
     {code: "landtrust", name:"Community Land Trusts"},
     {code: "firstsourc", name:"First source hiring"}
  ];

  this.cityList = mapData.features.reduce((list, feature) => {
      list.push(feature.properties.city);
      return list; 
    }, []).sort();
}

resetPosition = () => {
  this.setState({
    lat: 37.7,
    lng: -122.6
  })
}

updateStyle = (focusCity, focusPolicy) => {
  this.setState({
    focusCity: focusCity,
    focusPolicy: focusPolicy,
    style: function (geoJsonFeature) {
      return {
        fillColor: (focusPolicy === "total" ? getColorTotal(geoJsonFeature.properties.total) : getColor(geoJsonFeature.properties[focusPolicy])),
        weight: (geoJsonFeature.properties.city === focusCity ? 2 : 1),
        opacity: (geoJsonFeature.properties.city === focusCity ? 1 : 0.5),
        color: (geoJsonFeature.properties.city === focusCity ? "#000" : "#FFF"),
        fillOpacity: 0.9
      } ;
    }
  });

}

onEachFeature = (feature, layer) => {
  layer.on({
    click: this.clickToFeature.bind(this)
  });
}

clickToFeature = (e) => {
  var layer = e.target;
  layer.bringToFront();

  this.updateStyle(e.target.feature.properties.city, this.state.focusPolicy);
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
          data={mapData} 
          style={this.state.style} 
          onEachFeature={this.onEachFeature} />
        <ZoomControl position='topright' />

        <div className="dropdown dropdown-right policy-selector">
          <a href="#" className="btn bg-light dropdown-toggle" tabIndex="0">
            Map a specific policy... <i className="icon icon-caret"></i>
          </a>
          <ul className="menu">
            <li className="menu-item" key="total">
              <a onClick={() => this.updateStyle(this.state.focusCity, "total")}>Count of anti-displacement policies</a>
            </li>
            <li className="divider"></li>
            {this.policyList.map( (policy) => 
              <li className="menu-item" key={policy.code}>
                <a onClick={() => this.updateStyle(this.state.focusCity, policy.code)}>{policy.name}</a>
              </li> )}
          </ul>
        </div>

        <div className="dropdown dropdown-right city-selector">
          <a href="#" className="btn bg-light dropdown-toggle" tabIndex="0">
            Find a city... <i className="icon icon-caret"></i>
          </a>
          <ul className="menu">
            <li className="menu-item" key="total">
              <a onClick={() => this.resetPosition()}>Show All</a>
            </li>
            <li className="divider"></li>
            {this.cityList.map( (cityName) => 
              <li className="menu-item" key={cityName}>
                <a onClick={() => this.updateStyle(cityName, this.state.focusPolicy)}>{cityName}</a>
              </li> )}
          </ul>
        </div>

      </Map>
    );

  }
}

export default App;

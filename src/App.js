import React from 'react';
import { Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';
import L from 'leaflet';
import mapData from './data/mapData.json';

import './App.scss'

const INITIAL_MAP_BOUNDS = L.latLngBounds(
  L.latLng(36.923548,-123.895569),
  L.latLng(38.328730,-120.470581)
);

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
  const map = this.refs.map.leafletElement;
  map.flyToBounds(INITIAL_MAP_BOUNDS,
    {
      padding: [100,100], 
      duration: 0.5, 
      easeLinearity: 0.5
    });
}

updateStyle = (focusCity, focusPolicy) => {
  //.find( (element) => (element.feature.properties.city === focusCity) ) )
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

zoomToFeature = (focusCity) => {
  const map = this.refs.map.leafletElement,
        data = this.refs.data.leafletElement,
        focusElement = Object.values(data._layers).find( (element) => (element.feature.properties.city === focusCity) ); 
  focusElement.bringToFront();
  map.flyToBounds(focusElement._bounds, 
    {
      padding: [250,250], 
      duration: 0.25, 
      easeLinearity: 0.5, 
      maxZoom: 10
    });
}

handleFeatureClick = (e) => {
  var layer = e.target;
  this.updateStyle(e.target.feature.properties.city, this.state.focusPolicy);
  layer.bringToFront();
}

onEachFeature = (feature, layer) => {
  layer.on({
    click: this.handleFeatureClick.bind(this)
  });
}

render() {
  const position = [this.state.lat, this.state.lng];

    return (
    <div>
      <Map ref='map' center={position} zoom={this.state.zoom} zoomControl={false} scrollWheelZoom={true} className="map-container">
        <TileLayer 
          className="basemap-layer"
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        <TileLayer 
          className="reference-layer"
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" 
          pane="shadowPane" />        
        <GeoJSON 
          ref='data' 
          data={mapData} 
          style={this.state.style} 
          onEachFeature={this.onEachFeature} />
        <ZoomControl position='topright' />
      </Map>
      <div className="overlay-container">
        <button className="uk-button uk-button-default policy-selector" type="button">Map a specific policy... </button>
        <div uk-dropdown="pos: bottom-right; mode: click">
          <div className="uk-height-medium uk-overflow-auto">
            <ul className="uk-nav uk-dropdown-nav">
              <li>
                <a href='#' 
                   className={(this.state.focusPolicy === "total" ? "active" : "")}
                   onClick={() => this.updateStyle(this.state.focusCity, "total")}>
                     Count of anti-displacement policies
                </a>
              </li>
              <li className="uk-nav-divider"></li>
              {this.policyList.map( (policy) => 
                <li key={policy.code}>
                  <a href='#' 
                     className={(this.state.focusPolicy === policy.code ? "active" : "")}
                     onClick={() => this.updateStyle(this.state.focusCity, policy.code)}>
                       {policy.name}
                  </a>
                </li> )}
            </ul>
          </div>
        </div>
        <button className="uk-button uk-button-default city-selector" type="button">Find a city... </button>
        <div uk-dropdown="pos: bottom-right; mode: click">
          <div className="uk-height-medium uk-overflow-auto">
            <ul className="uk-nav uk-dropdown-nav">
                <li>
                  <a href='#' onClick={() => {this.updateStyle(null, this.state.focusPolicy); this.resetPosition();}}>Show All</a>
                </li>
                <li className="uk-nav-divider"></li>
                {this.cityList.map( (cityName) => 
                <li key={cityName}>
                  <a href='#' 
                     className={(this.state.focusCity === cityName ? "active" : "")}
                     onClick={() => {this.updateStyle(cityName, this.state.focusPolicy); this.zoomToFeature(cityName);}}>
                      {cityName}
                  </a>
                </li> )}
            </ul>
          </div>
        </div>
      </div>
    </div>
    );

  }
}

export default App;

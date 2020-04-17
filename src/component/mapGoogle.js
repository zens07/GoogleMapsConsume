import React, { Component } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import { default as update } from "react-addons-update";
import axios from "axios";

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      isInfoShown: false,
      markers: [
        {
          position: {
            lat: -2.548926,
            lng: 118.0148634,
          },
          key: "indonesia",
          defaultAnimation: 2,
          isInfoShown: false,
        },
      ],
      position: [],
    };
  }

  componentDidMount(){
    this.getMapsData()
  }

  getMapsData = async () => {
    try {
      const response = axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=${
        process.env.REACT_APP_GOOGLE_KEY
      }`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  handleMarkerClick = (e) => {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  };

  handleRightMarkerClick = (index) => {
    console.log("index", index);
    let { markers } = this.state;
    this.setState({
      markers: update(markers, { $splice: [[index, 1]] }),
    });
  };

  handleInfoClick = (marker) => {
    console.log("info function", marker);
    let position = [];
    position = [marker.latLng.lat(), marker.latLng.lng()];
    console.log(position);
    this.setState(position);
  };

  render() {
    console.log("array in render", this.state.markers);
    return (
      <div>
        <GoogleMap
          defaultZoom={5}
          defaultCenter={{
            lat: -2.548926,
            lng: 118.0148634,
          }}
          onClick={(e) => this.handleMarkerClick(e)}
        >
          {this.state.markers.map((marker, index) => (
            // return (
              <Marker
                position={{
                  lat: marker.position.lat,
                  lng: marker.position.lng,
                }}
                key={marker.key}
                defaultAnimation={marker.defaultAnimation}
                onClick={(marker) => this.handleInfoClick(marker)}
                onRightClick={(index)=>this.handleRightMarkerClick(index)}
              />
            // );
          ))}
          {this.state.position.length > 0 && (
            <InfoWindow
              position={{
                lat: this.state.position[0],
                lng: this.state.position[1],
              }}
            >
                <div>
              <h1>currert location</h1>
              <p>
                lat: {this.state.position[0]} lng: {this.state.position[1]}
              </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }
}

export const MapWrapped = withScriptjs(withGoogleMap(Map));

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

/**
 * @description
 * MapComponent is using for presenting facilities information in Map
 *
 * @require facility lat and lng information
 * 
*/
const ReactComponentCircle = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: -6.173110,
      lng: 106.829361
    },
    zoom: 10
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '800px', width: '1000px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDKbU51XZjtk3gywazxmR9QxM9RCwqULzg" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <ReactComponentCircle
            lat={-6.173110}
            lng={106.829361}
            text={'My Location'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapComponent;
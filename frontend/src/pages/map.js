// Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '800px',
    height: '600px'
  };

  const center = {
    lat: 40.7128, // New York City latitude
    lng: -74.0060 // New York City longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAqsE9kV7XRj61p4AFxyQMrpj1yxm14BBg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

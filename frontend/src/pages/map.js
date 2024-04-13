// Map.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  // Define map container style
  const mapContainerStyle = {
    width: '800px',
    height: '600px'
  };

  // Define the center of the map (New York City)
  const center = {
    lat: 40.7128,
    lng: -74.0060
  };

  // Define map options
  const defaultOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // State variables for events and selected place
  const [events, setEvents] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMarker, setShowMarker] = useState(false);

  // Function to handle map load event
  const handleMapLoad = (map) => {
    // Perform actions when the map is loaded
    console.log('Map loaded:', map);
  };

  // Function to handle map unmount event
  const handleMapUnmount = () => {
    // Perform cleanup or other actions when the map is unmounted
    console.log('Map unmounted');
  };

  // Function to handle map click event
  const handleMapClick = (event) => {
    // Perform actions when the map is clicked
    console.log('Map clicked:', event);
  };

  // Function to handle marker click event
  const handleMarkerClick = (event) => {
    // Perform actions when a marker is clicked
    console.log('Marker clicked:', event);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDNS9_S5dEJ9oZWGDXIR4Bc3GdRrGMY52E">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={defaultOptions}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
        onClick={handleMapClick}
      >
        {/* Render event markers */}
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{
              lat: Number(event.latitude),
              lng: Number(event.longitude),
            }}
            icon={{
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => handleMarkerClick(event)}
          />
        ))}

        {/* Render selected place marker if available */}
        {selectedPlace && showMarker && (
          <Marker
            position={{
              lat: selectedPlace.lat,
              lng: selectedPlace.lng,
            }}
            icon={{
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

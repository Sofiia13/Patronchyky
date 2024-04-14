import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  // Define map container style
  const mapContainerStyle = {
    width: "800px",
    height: "600px",
  };

  // Define the center of the map (New York City)
  let lat = localStorage.getItem("latitude");
  let lon = localStorage.getItem("longitude");

  // Parse latitude and longitude to numbers
  lat = parseFloat(lat);
  lon = parseFloat(lon);

  const center = {
    lat: lat,
    lng: lon,
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
  const [markerPosition, setMarkerPosition] = useState(null); // State for marker position

  // Function to handle map load event
  const handleMapLoad = (map) => {
    // Perform actions when the map is loaded
    console.log("Map loaded:", map);
  };

  // Function to handle map unmount event
  const handleMapUnmount = () => {
    // Perform cleanup or other actions when the map is unmounted
    console.log("Map unmounted");
  };

  // Function to handle map click event
  const handleMapClick = (event) => {
    // Set marker position when the map is clicked
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setShowMarker(true); // Show the marker
  };

  // Function to handle marker click event
  const handleMarkerClick = (event) => {
    // Perform actions when a marker is clicked
    console.log("Clicked on ma p :", event.latLng.lat(), event.latLng.lng());
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDNS9_S5dEJ9oZWGDXIR4Bc3GdRrGMY52E">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
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

        {/* Render marker if markerPosition is set */}
        {markerPosition && showMarker && (
          <Marker
            position={markerPosition}
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

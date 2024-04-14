import React, { useState, useEffect, useParams } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Map = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/tasks/getAllTasks`
        ); // Adjust the endpoint URL as per your backend setup

        console.log("Tasks received:", response.data); // Print received tasks
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);

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
    console.log(event); // Show the marker
  };

  // Function to handle marker click event
  const handleMarkerClick = (event) => {
    // Perform actions when a marker is clicked
    console.log(event);
    setSearchParams({
      eventId: event._id,
    });
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
        {Array.from(events).map((event) => (
          <Marker
            key={event.id}
            position={{
              lat: event.location.coordinates[1],
              lng: event.location.coordinates[0],
            }}
            icon={{
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => handleMarkerClick(event)}
          />
        ))}

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
      {error && <p>{error}</p>}
    </LoadScript>
  );
};

export default Map;

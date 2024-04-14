import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import location from '../img/location.svg';
import Map from './map'; // Import the Map component

function success(position) {
  console.log('Work');

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  localStorage.setItem('latitude', latitude.toString());
  localStorage.setItem('longitude', longitude.toString());
}

function error() {
  console.log('Unable to retrieve your location');
}

function OrganizationPage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('Geolocation not supported');
  }
  
  const [organizationObject, setOrganizationObject] = useState({});
  const [taskObject, setTaskObject] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationResponse = await axios.get(`http://localhost:3001/organizations/organization/${id}`);
        const taskResponse = await axios.get(`http://localhost:3001/tasks/task/${id}`);
        setOrganizationObject(organizationResponse.data);
        setTaskObject(taskResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Organization not found');
        } else {
          alert('Error');
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="content">
      <section className="organization-content">
        <div className="organization-info">
          <h2 className="organization-name">Organization Name: {organizationObject.name}</h2>
        </div>
        <div className="section-title">
          <h3 className="section-title">Description</h3>
        </div>
        <div className="organization-description">
          <p>{organizationObject.description}</p>
        </div>
      </section>
      <section className="tasks">
        <div className="section-title">
          <h2 className="section-title">Tasks</h2>
        </div>
        <div className="tasks-gallery">
          <div className="task">
            <div className="task-desc">
              <div className="task-title">
                <h4 className="task-name">Task Name: {taskObject.name}</h4>
                <p className="task-date">Task Date: {taskObject.date}</p>
              </div>
              <div className="task-priority">
                <p>Priority: {taskObject.priority}</p>
              </div>
              <div className="task-description">
                <p>Description: {taskObject.description}</p>
              </div>
              <div className="task-location">
                <img className="icon-img" src={location} alt="Location" />
                <p>Location: {taskObject.location}</p>
              </div>
              <div className="task-progress">
                <h4>Progress:</h4>
                <div className="progress-tracker">
                  <div className="progress-bar" style={{ width: `${taskObject.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="map-section">
        <h2>Map</h2>
        <Map
          lat={organizationObject.latitude}
          lng={organizationObject.longitude}
        />
      </section>
    </div>
  );
}

export default OrganizationPage;

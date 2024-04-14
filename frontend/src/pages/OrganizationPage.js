import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import location from "../img/location.svg";
import Map from "./map";

function success(position) {
  console.log("Work");

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  localStorage.setItem("latitude", latitude.toString());
  localStorage.setItem("longitude", longitude.toString());
}

function error() {
  console.log("Unable to retrieve your location");
}

function OrganizationPage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  const [progress, setProgress] = useState(0);
  const [organizationObject, setOrganizationObject] = useState({});
  const [taskObject, setTaskObject] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationResponse = await axios.get(
          `http://localhost:3001/organizations/organization/${id}`
        );

        console.log(organizationResponse.data);

        const taskResponse = await axios.get(
          `http://localhost:3001/tasks/getAllTasks`
        );

        console.log("data", taskResponse.data);
        setOrganizationObject(organizationResponse.data);
        setTaskObject(taskResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          if (error.response.config.url.includes("organizations")) {
            alert("Organization not found");
          } else if (error.response.config.url.includes("tasks")) {
            alert("Task not found");
          }
        } else {
          alert("Error occurred while retrieving data");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content">
      <section className="organization-content">
        <div className="organization-info">
          <h2 className="organization-name">
            Organization Name: {organizationObject.name}
          </h2>
        </div>
        <div className="section-title">
          <h3 className="section-title">Description:</h3>
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
          {taskObject.map((task, index) => (
            <div className="task" key={index}>
              <div className="task-desc">
                <div className="task-title">
                  <h4 className="task-name">Task Name: {task.name}</h4>
                  <p className="task-date">Task Date: {task.createdAt}</p>
                </div>
                <div className="task-priority">
                  <p>Task Priority: {task.priority}</p>
                </div>
                <div className="task-description">
                  <p>Task Description: {task.description}</p>
                </div>
                <div className="task-location">
                  <img
                    className="icon-img"
                    src={location}
                    alt="task-location"
                  />
                  <p>
                    Task Location: {task.location.latitude} -{" "}
                    {task.location.longitude}
                  </p>
                </div>
                <div className="task-progress">
                  <h4>Progress:</h4>
                  <div
                    className="progress-tracker"
                    id={`progress-tracker-${index}`}
                  >
                    <div
                      id={`progress-bar-${index}`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="map-section">
          <h2>Map</h2>
          <Map
            lat={organizationObject.latitude}
            lng={organizationObject.longitude}
          />
        </section>
      </section>
    </div>
  );
}

export default OrganizationPage;

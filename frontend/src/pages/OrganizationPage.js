import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

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
          console.error("error:", error);
        }
      }
    };

    fetchData();
  }, []);

  console.log("taskObject", taskObject);
  const selectedItem = searchParams.get("eventId");

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
            <div
              className={selectedItem == task._id ? "task selected" : "task"}
              key={index}
            >
              <div className="task-desc">
                <div className="task-title">
                  <h4 className="task-name">Task Name: {task.name}</h4>
                  {selectedItem === task._id && <span>selected</span>}
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
                    Task Location: {task.location.coordinates[0]} -{" "}
                    {task.location.coordinates[1]}
                  </p>
                </div>
                <div className="task-progress">
                  <h4>Progress:</h4>
                  <div
                    className="progress-tracker"
                    id={`progress-tracker-${25}`}
                  >
                    <div
                      id={`progress-bar-${25}`}
                      style={{ width: `${25}%` }}
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

import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

import location from '../img/location.svg';

function OrganizationPage() {  
    const [progress, setProgress] = useState(0);
    const [organizationObject, setOrganizationObject] = useState({});
    const [taskObject, setTaskObject] = useState({});
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationResponse = await axios.get(`http://localhost:3001/organizations/organization/${id}`);
                const taskResponse = await axios.get(`http://localhost:3001/organizations/organization/${id}/tasks`);
                setOrganizationObject(organizationResponse.data);
                setTaskObject(taskResponse.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    if (error.response.config.url.includes('organizations')) {
                        alert('Organization not found');
                    } else if (error.response.config.url.includes('tasks')) {
                        alert('Task not found');
                    }
                } else {
                    alert('Error occurred while retrieving data');
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="content">
            <section className='organization-content'>
                <div className='organization-info'>
                    <h2 className="organization-name">Organization Name: {organizationObject.name}</h2>
                </div>
            <div className='section-title'>
                <h3 className="section-title">Description:</h3>
            </div>
            <div className='organization-description'>
                <p>
                    {organizationObject.description}
                </p>
            </div>
            </section>
           <section className='tasks'>
                <div className='section-title'>
                    <h2 className="section-title">Tasks</h2>
                </div>
                <div className="tasks-gallery">
                    <div className="task">
                        <div className="task-desc">
                            <div className='task-title'>
                                <h4 className="task-name">Task Name: {taskObject.name}</h4>
                                <p className='task-date'>Task Date: {taskObject.date}</p>
                            </div>
                            <div className='task-priority'>
                                <p>Task Priority: {taskObject.priority}</p>
                            </div>
                            <div className='task-description'>
                                <p>Task Description: {taskObject.description}</p>
                            </div>
                            <div className='task-location'>
                                <img className="icon-img" src={location} alt="task-location" />
                                <p>Task Location: {taskObject.location}</p>
                            </div>
                            <div className='task-progres'>
                                <h4>Progres:</h4>
                                <div className='progress-tracker' id="progress-tracker">
                                    <div id="progress-bar" style={{ width: `${taskObject.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
        </div>
  )
}

export default OrganizationPage
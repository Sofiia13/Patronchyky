import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

import location from '../img/location.svg';

function OrganizationPage() {  
    const [progress, setProgress] = useState(0); 
    {/*
    let navigate = useNavigate();
    const [organizerObject, setorganizerObject] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/organizations/organization/${id}`
            );
            console.log(id)
            setorganizerObject(response.data);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              alert("Organization not found");
            } else {
                alert("Error");
            }
          }
        };
    
        fetchData();
      }, [id, navigate]);
 */}
    return (
    <body>
        <div className="content">
            <section className='organizer-content'>
                <div className='organizer-info'>
                    <h2 className="organizer-name">organizer Name{/*organizerObject.name*/}</h2>
                    <div className='organizer-organizer'>
                        <h3>organizerk organizer{/*organizerObject.organizer*/}</h3>
                    </div>
                </div>
            <div className='section-title'>
                <h2 className="section-title">organizer description</h2>
            </div>
            <div className='organizer-description'>
                <p>
                    {/*organizerObject.description*/}
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
                                <h4 className="task-name">Task name</h4>
                                <p className='task-date'>task-date</p>
                            </div>
                            <div className='task-location'>
                                <img className="icon-img" src={location} alt="task-location" />
                                <p>task-location</p>
                            </div>
                            <div className='task-progres'>
                                <h4>Progres:</h4>
                                <div className='progress-tracker' id="progress-tracker">
                                    <div id="progress-bar" style={{ width: `${60/*progress*/}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
        </div>
    </body>
  )
}

export default OrganizationPage
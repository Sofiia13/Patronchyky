import React, { useState } from "react";
import axios from 'axios';

function AddTasksPage() {
  const [formData, setFormData] = useState({
    reqName: '',
    reqLocation: '',
    reqDescription: '',
    priority: 'Default',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/addTask', formData);
      console.log(response.data);
      setFormData({
        reqName: '',
        reqLocation: '',
        reqDescription: '',
        priority: 'Default',
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <body>
      <section className="content">
        <div className="Add-Task-form">
          <form onSubmit={handleSubmit}>
            <div className="form-item">
                <h3 className="category-title">Task Name</h3>
              <input
                className="input-wrapper"
                type="text"
                id="text"
                name="reqName"
                placeholder="Task Name"
                value={formData.reqName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <h3 className="category-title">In</h3>
              <input
                className="input-wrapper"
                type="text"
                id="text"
                name="reqLocation"
                placeholder="Location"
                value={formData.reqLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <h3 className="category-title">Priority</h3>
              <div className="radio-list">
                <div>
                    <input type="radio" id="radioDefault" name="radio" value="Default" defaultChecked />
                    <label htmlFor="radioDefault">Default</label>
                </div>
                <div>
                    <input type="radio" id="radioUrgent" name="radio" value="Urgent" />
                    <label htmlFor="radioUrgent">Urgent</label>
                </div>
              </div>
           </div>
            <div className="form-item">
              <h3 className="category-title">Description</h3>
              <textarea
                className="input-wrapper"
                type="text"
                id="text"
                name="reqDescription"
                placeholder="Write something..."
                value={formData.reqDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <h3 className="category-title">Start</h3>
              <input
                className="input-wrapper"
                type="date"
                id="dateStart"
                name="task-start"
                defaultValue="2024-04-14"
                placeholder="Month, day, year"
                min="2024-01-01"
                max="2026-12-31"
              />
            </div>
            <div className="form-item">
              <h3 className="category-title">End</h3>
              <input
                className="input-wrapper"
                type="date"
                id="dateEnd"
                name="task-end"
                defaultValue="2024-04-14"
                placeholder="Month, day, year"
                min="2024-01-01"
                max="2026-12-31"
              />
            </div>
            <div className="buttons">
                <button type="submit" className="submit-button" onClick={handleSubmit} id="add-task-btn">Add task</button>
            </div>
          </form>
        </div>
      </section>
    </body>
  );
}

export default AddTasksPage;

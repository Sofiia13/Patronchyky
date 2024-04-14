import React, { useState } from "react";
import axios from 'axios';

function AddTasksPage() {
  const [formData, setFormData] = useState({
    reqName: '',
    reqLocation: '',
    reqDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://example.com/tasks/add', formData);
      console.log(response.data); // Assuming server responds with success message
      // Optionally reset form fields after successful submission
      setFormData({
        reqName: '',
        reqLocation: '',
        reqDescription: '',
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
                <button type="button" className="cancel-button" id="cancel-btn">Cancel</button>
                <button type="submit" className="submit-button" id="add-task-btn">Add task</button>
            </div>
          </form>
        </div>
      </section>
    </body>
  );
}

export default AddTasksPage;

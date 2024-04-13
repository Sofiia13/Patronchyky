import React from "react";

function addTasksPage() {
  return (
    <body>
      <section className="content">
        <div className="Add-Task-form">
          <div className="form-item">
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
            <input type="radio" id="radio" name="radio" value="Default">
              Default
            </input>
            <input type="radio" id="radio" name="radio" value="Urgent">
              Urgent
            </input>
          </div>
          <div className="form-item">
            <h3 className="category-title">Description</h3>
            <input
              className="input-wrapper"
              type="text"
              id="text"
              name="reqDescription"
              placeholder="Write something..."
              value={formData.reqLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <h3 className="category-title">Start</h3>
            <input
              type="date"
              id="date"
              name="task-start"
              value="2024-04-14"
              placeholder="Month, day, year"
              min="2024-01-01"
              max="2026-12-31"
            />
          </div>
          <div className="form-item">
            <h3 className="category-title">End</h3>
            <input
              type="date"
              id="date"
              name="task-start"
              value="2024-04-14"
              placeholder="Month, day, year"
              min="2024-01-01"
              max="2026-12-31"
            />
          </div>
          <button className="buttons" id="cancel-btn">
            Cancel
          </button>
          <button className="buttons" id="add-task-btn">
            Add task
          </button>
        </div>
      </section>
    </body>
  );
}

export default addTasksPage;

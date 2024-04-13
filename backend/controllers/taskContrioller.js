const taskModel = require("../models/taskModel");


const createTask = async (req, res) => {
    const { name, description, coordinates, priority, progress } = req.body;
  
    try {
    console.log(req.body)

      // Create a new task instance
      const newTask = new taskModel({
        name,
        description,
        location: {
          type: "Point",
          coordinates: coordinates || [0, 0], // Default coordinates if not provided
        },
        priority: priority || 'low', // Default priority if not provided
        progress: progress || 0, // Default progress if not provided
      });
      
  
      // Save the new task to the database
      const savedTask = await newTask.save();
  
      // If the task is saved successfully, return success response
      return res.status(201).json({ success: true, task: savedTask });
    } catch (error) {
      // If an error occurs, log the error and return an error response
      console.error("Error creating task:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  const updateTaskProgress = async (req, res) => {
    try {
        const { taskId, progress } = req.body;

        // Find the task by ID
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update the task's progress
        task.progress = progress;
        await task.save();

        // Return success response
        return res.status(200).json({ success: true, task });
    } catch (error) {
        // If an error occurs, log the error and return an error response
        console.error("Error updating task progress:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createTask,
    updateTaskProgress,
};
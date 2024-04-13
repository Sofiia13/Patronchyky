const taskModel = require("../models/taskModel");
const organizationModel = require('../models/organizationModel');


const createTask = async (req, res) => {
    const { name, description, coordinates, priority, progress } = req.body;
    const {orgId} = req.body;
    try {
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
      
      const organization = await organizationModel.findById(orgId);

      const result = await organizationModel.updateOne(
        { _id: organization._id },
        { $addToSet: { tasks: savedTask._id } }
      );
       console.log(result);
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

const getTasks = async (req, res) => {
  try {
      // Define a mapping of priority levels to numerical values
      const priorityMap = {
          'high': 0,  // High priority is treated as the highest
          'low': 1    // Low priority is treated as the lowest
      };

      // Query the tasks from the database
      const tasks = await taskModel.find();

      // Sort the tasks based on the following conditions:
      // 1. Place tasks with progress 100 at the end
      // 2. Within each progress level, sort tasks based on the mapped numerical values of priority
      tasks.sort((a, b) => {
          // Compare progress first: progress of 100 should be at the end
          if (a.progress === 100 && b.progress !== 100) {
              return 1;
          }
          if (a.progress !== 100 && b.progress === 100) {
              return -1;
          }

          // If progress is equal and not 100, compare priorities
          return priorityMap[a.priority] - priorityMap[b.priority];
      });

      // Return the tasks in a success response
      return res.status(200).json({ tasks });
  } catch (error) {
      // If an error occurs, log the error and return an error response
      console.error("Error getting tasks:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
    createTask,
    updateTaskProgress,
    getTasks
};
const taskModel = require("../models/taskModel");
const organizationModel = require("../models/organizationModel");

const { returnIdFromCookies } = require("../JWT/JWT");
const axios = require("axios"); // Ensure axios is imported at the top of your file

async function getLocationFromAddress(address, apiKey) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = response.data;
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return [location.lng, location.lat]; // Return longitude and latitude as an array
    } else {
      // Handle case where address couldn't be geocoded
      throw new Error("Unable to geocode address: " + address);
    }
  } catch (error) {
    // Modify the error message to include the original error message
    throw new Error("Error fetching data: " + error.message);
  }
}

const createTask = async (req, res) => {
  const {
    reqName: name,
    reqDescription: description,
    reqLocation: location,
    priority,
    progress,
  } = req.body;

  try {
    console.log(req.body);
    // console.log(req.body)
    const { orgId } = "661b540023428d0b30285208";

    let coordinates = await getLocationFromAddress(
      location,
      "AIzaSyDNS9_S5dEJ9oZWGDXIR4Bc3GdRrGMY52E"
    );
    // Create a new task instance
    const newTask = new taskModel({
      name: name,
      description: description,
      location: {
        type: "Point",
        coordinates: coordinates[(0, 0)],
      },
      priority: priority,
      progress: progress || 0, // Default progress if not provided
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    const organization = await organizationModel.findById(orgId);

    // const result = await organizationModel.updateOne(
    //   { _id: organization._id },
    //   { $addToSet: { tasks: savedTask._id } }
    // );
    // console.log(result);
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
  const orgId = req.params.id;

  try {
    // Define a mapping of priority levels to numerical values
    const priorityMap = {
      high: 0, // High priority is treated as the highest
      low: 1, // Low priority is treated as the lowest
    };

    // Query the tasks from the database

    const organization = await organizationModel.findById(orgId);
    let tasks = organization.tasks;

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

const getTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await taskModel.findById(taskId);
  console.log("Мако=арон розетка", task);
  if (!task) {
    return res.status(400).json({ error: "Немає таски за таким ID" });
  }
  return res.status(200).json(task);
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTask,
  updateTaskProgress,
  getTasks,
  getTask,
  getAllTasks,
};

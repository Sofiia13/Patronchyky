const express = require("express");
const router  = express.Router();
const path = require("path");

const authController = require("../controllers/authController");
const taskController = require("../controllers/taskContrioller");



router.post('/signup', authController.createUser);
router.post('/addTask', taskController.createTask);
router.put('/UpdateTask', taskController.updateTaskProgress);

module.exports = router; 
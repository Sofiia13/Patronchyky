const express = require("express");
const router = express.Router();
const path = require("path");

const authController = require("../controllers/authController");

router.post("/signup", authController.createUser);
router.post("/orgSignup", authController.createOrganization);
// router.post('/addTask', taskController.createTask);
// router.put('/UpdateTask', taskController.updateTaskProgress);

module.exports = router;

const express = require("express");
const router  = express.Router();
const path = require("path");

const authController = require("../controllers/authController");
const taskController = require("../controllers/taskContrioller");

router.get('/getTasks', taskController.getTasks);

module.exports = router;
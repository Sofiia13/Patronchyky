const express = require("express");
const router  = express.Router();
const path = require("path");


const taskController = require("../controllers/taskContrioller");

router.get('/getTasks/:id', taskController.getTasks);
router.post('/addTask', taskController.createTask);
router.put('/UpdateTask', taskController.updateTaskProgress);


module.exports = router;
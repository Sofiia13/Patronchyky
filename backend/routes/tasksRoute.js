const express = require("express");
const router  = express.Router();
const path = require("path");

const {validateTokenForOrg, validateToken} = require('../JWT/JWT');

const taskController = require("../controllers/taskContrioller");

router.get('/getTasks/:id', validateToken , taskController.getTasks);

router.post('/addTask', validateTokenForOrg , taskController.createTask);

router.put('/UpdateTask', validateTokenForOrg , taskController.updateTaskProgress);


module.exports = router;
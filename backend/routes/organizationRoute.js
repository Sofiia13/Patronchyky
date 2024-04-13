const express = require("express");
const router  = express.Router();

const organizationController = require('../controllers/organizationController');


router.get('/organization/:id', organizationController.getOrganizationInfo);


module.exports = router; 
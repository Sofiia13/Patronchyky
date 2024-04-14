const express = require("express");
const router  = express.Router();
const {validateToken} = require('../JWT/JWT')

const organizationController = require('../controllers/organizationController');


router.get('/organization/:id', validateToken, organizationController.getOrganizationInfo);


module.exports = router; 
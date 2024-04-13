const express = require("express");
const router  = express.Router();
const path = require("path");

const authController = require("../controllers/authController");

/* router.post('/userSignup', authController.createUser); */

router.post('/orgSignup', authController.createOrganization);

module.exports = router;
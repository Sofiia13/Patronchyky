const express = require("express");
const router  = express.Router();
const path = require("path");

const authController = require("../controllers/authController");

const {validateTokenForLogged} = require('../JWT/JWT');


router.post('/signup', validateTokenForLogged, authController.createUser);

router.post('/login-for-user', validateTokenForLogged, authController.loginForUser);

router.post('/login-for-org', validateTokenForLogged, authController.loginForOrg)

router.post("/orgSignup", validateTokenForLogged , authController.createOrganization);

module.exports = router; 
const express = require("express");
const router = express.Router();
const path = require("path");

const authController = require("../controllers/authController");


const {validateTokenForLogged} = require('../JWT/JWT');


router.post('/signup-user', validateTokenForLogged, authController.createUser);

router.post('/signup-org', validateTokenForLogged, authController.createOrganization);

router.post('/login', validateTokenForLogged, authController.login);

router.post("/orgSignup", validateTokenForLogged , authController.createOrganization);

module.exports = router;

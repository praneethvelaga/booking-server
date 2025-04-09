'use strict';
const express = require('express');
const LoginController = require('../controller/loginController.js'); 
const passport = require('passport');
require('../middleware/passport.js');

const router = express.Router();

const LoginRoutes =()=>{
    router.post('/autontication',LoginController.login);
    
    return router;
}
const registrRoute=()=>{
    router.post('/RegisterNewUser',LoginController.regsiter);
    return router;
}

module.exports = {
    LoginRoutes,
    registrRoute
};
const express = require('express');
const authRouter = express.Router();
const authController=require('../controllers/auth.controller')
const identifyUser = require('../middleware/auth.middleware');

// POST /api/auth/register
authRouter.post("/register",authController.register);


// POST /api/auth/login

authRouter.post("/login",authController.loginController);


// POST /api/auth/get-me
authRouter.post("/get-me",identifyUser,authController.getMeController);


module.exports = authRouter;

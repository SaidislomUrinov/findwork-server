import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.js";

export default Router()
    .post('/signUp', userController.signUp)
    .post('/signIn', userController.signIn)
    .post('/resendActivator', userController.resendActivator)
    .post('/activate', userController.activate)
    .get('/verify', userAuth, userController.verify)
    .get('/getStats', userController.getStats)
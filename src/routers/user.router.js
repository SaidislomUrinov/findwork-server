import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.js";

export default Router()
    .post('/auth', userController.auth)
    .get('/verifyActivator', userController.verifyActivator)
    .get('/verify', userAuth, userController.verify)
    .get('/getStats', userController.getStats)
    // 
    .post('/updateRole', userAuth, userController.updateRole)
    .get('/getMyStats', userAuth, userController.getMyStats)
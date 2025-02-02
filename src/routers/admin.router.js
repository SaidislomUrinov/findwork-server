import { Router } from "express";
import { adminAuth } from "../middlewares/auth.js";
import adminController from "../controllers/admin.controller.js";

export default Router()
    .post('/signIn', adminController.signIn)
    .get('/verify', adminAuth, adminController.verify)
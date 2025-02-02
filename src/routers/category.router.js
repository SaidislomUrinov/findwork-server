import { Router } from "express";
import { adminAuth } from "../middlewares/auth.js";
import categoryController from "../controllers/category.controller.js";

export default Router()
// admin
.post('/create', adminAuth, categoryController.create)
.get('/getAll', adminAuth, categoryController.getAll)
.put('/update', adminAuth, categoryController.update)
.get('/getById', adminAuth, categoryController.getById)
.delete('/delete', adminAuth, categoryController.delete)
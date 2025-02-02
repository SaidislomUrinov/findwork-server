import { Router } from "express";
import adminRouter from "./routers/admin.router.js";

export default Router()
.use('/admin', adminRouter)
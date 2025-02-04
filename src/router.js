import { Router } from "express";
import adminRouter from "./routers/admin.router.js";
import categoryRouter from "./routers/category.router.js";
import userRouter from "./routers/user.router.js";

export default Router()
.use('/admin', adminRouter)
.use('/category', categoryRouter)
.use('/user', userRouter)
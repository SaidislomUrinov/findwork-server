import './src/utils/folders.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './src/utils/env.js';
import fileUpload from 'express-fileupload';
import router from './src/router.js';
import { sendActivator } from './src/utils/email.js';
mongoose.connect(MONGO_URI);
const app = express();
app.use(cors());
app.use(fileUpload());
app.use('/api', router);
app.listen(PORT, async ()=>{
    try {
        // const ok = await sendActivator('getmebroo@gmail.com', 'salom');
        // console.log(ok)
    } catch (error) {
        console.log(error.message)
    }
});

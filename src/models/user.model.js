import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
const schema = new Schema({
    image: String,
    firstName: String,
    lastName: String,
    about: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lowercase: true,
        trim: true
    },
    access: String,
    block: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['employer', 'staff']
    },
    isCompany: {
        type: Boolean,
        default: false
    },
    created: {
        type: Number,
        default: getNow
    }
});
export default model('User', schema);
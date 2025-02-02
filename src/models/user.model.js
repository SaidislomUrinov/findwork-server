import { model, Schema } from "mongoose";
const schema = new Schema({
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
    password: String,
    access: String,
    block: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['employer', 'staff']
    }
});
export default model('User', schema);
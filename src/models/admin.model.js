import { model, Schema } from "mongoose";
const schema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: String,
    access: String,
    role: {
        type: String,
        default: "admin",
        enum: ["owner", "admin"]
    }
});
export default model('Admin', schema);
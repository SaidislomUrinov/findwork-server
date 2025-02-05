import { model, Schema } from "mongoose";
import { getNow } from "../utils/date.js";
import applicationModel from "./application.model.js";

const schema = new Schema({
    tile: String,
    desc: String,
    attachments: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    created: {
        type: Number,
        default: getNow
    },
    ended: Number,
    status: {
        type: String,
        enum: ['pending', 'active', 'inactive', 'completed']
    },
    isTop: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    keywords: Array,
    skills: Array,
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'RUB', 'UZS']
    },
    location: String,
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance']
    },
    type: {
        type: String,
        enum: ['remote', 'hybrid', 'office']
    },
    location: String,
    withResume: Boolean,
    experience: {
        from: Number,
        to: Number
    },
    salary: {
        from: Number,
        to: Number,
        agree: Boolean,
        cpi: Boolean
    }
});
schema.methods.apllications = async function () {
    try {
        const applications = await applicationModel.countDocuments({ vacancy: this._id, status: 'pending' });
        return applications;
    } catch (error) {
        console.log(error.message);
        return 0
    }
}
export default model('Vacancy', schema)
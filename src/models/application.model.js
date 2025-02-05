import { model, Schema } from "mongoose";

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    viewed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'accepted']
    },
    vacancy: {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy'
    }
});

export default model('Application', schema);
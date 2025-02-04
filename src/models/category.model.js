import { model, Schema } from "mongoose";
const schema = new Schema({
    title: {
        uz: String,
        ru: String
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
});
schema.methods.vacancies = async function (){
    return 0
}
export default model('Category', schema);
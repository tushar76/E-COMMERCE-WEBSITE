import mongoose from "mongoose";


const QuerySchema = new mongoose.Schema({
    name : String,
    email: String,
    subject : String,
    message : String,
})

const query = mongoose.model('query', QuerySchema);

export default query;
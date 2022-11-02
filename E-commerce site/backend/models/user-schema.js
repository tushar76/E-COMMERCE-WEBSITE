import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: null
    }
})

UserSchema.plugin(passportLocalMongoose)

const user = mongoose.model('User', UserSchema);

export default user;
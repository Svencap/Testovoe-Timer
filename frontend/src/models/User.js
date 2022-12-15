import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    participates: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model('User', UserSchema);
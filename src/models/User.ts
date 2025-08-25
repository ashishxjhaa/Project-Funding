import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true,
        minlength: 6,
    },
    github: {
        type: String,
        required: false,
        default: "",
        trim: true,
        lowercase: true
    },
    languages: { 
        type: [String], 
        default: [] 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

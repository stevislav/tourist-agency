import mongoose from 'mongoose';
//const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    fName: {
        type: String,
        required:true
    },
    lName: {
        type: String,
        required:true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    isStaff:{
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    isActive:{
        type: Boolean,
        required: true,
        default: false
    },
    
},{timestamps:true});

export default mongoose.model("User", UserSchema)
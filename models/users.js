import mongoose from "mongoose";

//defining schema
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true,trim:true},
    join:{type:Date,default:Date.now}
})

//compiling schema
const userModel = mongoose.model('user',userSchema)

//export model
export {userModel}
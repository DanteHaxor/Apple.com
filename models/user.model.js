const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    country:String,
    dob:String,
    email:String,
    password:String
})
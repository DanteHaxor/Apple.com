const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    country:String,
    dob:String,
    email:String,
    password:String
})
const Usermodel=mongoose.model("user",userSchema)
module.exports=Usermodel
const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    quantity:{type:Number,default:1,min:1},
    userID:String
})
const Cartmodel = mongoose.model("cart",cartSchema)
module.exports=Cartmodel
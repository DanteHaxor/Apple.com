const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    userID:String,
    status:String,
})
const Ordermodel = mongoose.model("order",orderSchema)
module.exports=Ordermodel
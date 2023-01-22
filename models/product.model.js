const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    title:String,
    image:String,
    price:Number
})
const Productmodel=mongoose.model("Product",productSchema)
module.exports=Productmodel
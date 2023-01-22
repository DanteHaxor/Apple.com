const express = require('express');
const cartRouter=express.Router()
const Cartmodel=require("../models/cart.model")
const auth=require("../middleware/auth.middleware")
cartRouter.use(auth)
cartRouter.get("/",async (req,res)=>{
    try {
       let data= await Cartmodel.find({userID:req.body.userID})
       res.send(data)
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
cartRouter.post("/addtocart",async (req,res)=>{
    let {title,image,price,userID}=req.body
    try {
        let rdata=Cartmodel({title,image,price,userID})
        await rdata.save()
        res.send("Added to cart")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
cartRouter.delete("/delete/:id",async (req,res)=>{
    let id = req.params.id
    try {
        let data=Cartmodel.find({userID})
        if(data.userID==req.body.userID){
            await Cartmodel.findByIdAndDelete(id)
        }
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

module.exports = cartRouter
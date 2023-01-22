const express = require('express');
const orderRouter=express.Router()
const Ordermodel=require("../models/order.model")
const auth=require("../middleware/auth.middleware")
const adminauth=require("../middleware/adminauth.middleware")

orderRouter.use(auth)
orderRouter.get("/",async (req,res)=>{
    try {
        let data=await Ordermodel.find({userID:req.body.userID})
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
orderRouter.post("/addorder",async (req,res)=>{
    let {title,image,price,userID}=req.body
    try {
        let rdata=Ordermodel({title,image,price,userID,status:"processing"})
        await rdata.save()
        res.send("Order Placed")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
orderRouter.use(adminauth)
orderRouter.patch("/update/:id",async (req,res)=>{
    let id = req.params.id
    let data=req.body
    try {
        await Ordermodel.findByIdAndUpdate(id,data)
        res.send("Order updated")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
orderRouter.delete("/delete/:id",async (req,res)=>{
    let id = req.params.id
    try {
        await Ordermodel.findByIdAndDelete(id)
        res.send("Order deleted")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

module.exports = orderRouter
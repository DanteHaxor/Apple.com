const express = require('express');
const productRouter=express.Router()
const Productmodel=require("../models/product.model")
productRouter.get("/",async (req,res)=>{
    try {
    let data=await Productmodel.find()
    res.send(data)
    } catch (error) {
    console.log(error);
    res.send({error: error.message})
    }
    
})
productRouter.post("/",async (req,res)=>{
    let {title,image,price}=req.body
    try {
    let rdata=Productmodel({title,image,price})
    await rdata.save()
    res.send("Product added successfully")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
    
})
productRouter.patch("/:id",async (req,res)=>{
    let id = req.params.id
    let data=req.body
    try {
        await Productmodel.findByIdAndUpdate(id,data)
        res.send("Product updated")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})
productRouter.delete("/:id",async (req,res)=>{
    let id = req.params.id
    try {
        await Productmodel.findByIdAndDelete(id)
        res.send("product deleted")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

module.exports=productRouter
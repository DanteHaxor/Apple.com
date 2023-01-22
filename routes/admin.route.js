const express=require('express')
const adminRouter=express.Router()
const bcrypt=require("bcrypt")
const Adminmodel = require("../models/admin.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()
adminRouter.post("/register",(req,res)=>{
    let {username,email,password}=req.body
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            console.log(err);
        }else{
            let rdata=Adminmodel({username,email,password:hash})
            await rdata.save()
            res.send("Admin registered successfully")
        }
    });
})
adminRouter.post("/login",async (req,res)=>{
    let {username,password}= req.body
    let data=await Adminmodel.find({username})
    bcrypt.compare(password, data[0].password, function(err, result) {
        if(result){
            var token = jwt.sign({ userID : data._id }, process.env.key)
            res.cookie("token", token)
            res.send({"msg":"login success","token":token})
        }else{
            console.log(err);
            res.send("wrong credentials")
        }
    });

})

module.exports=adminRouter
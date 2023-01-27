const express=require('express')
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const Usermodel = require("../models/user.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/register",(req,res)=>{
    let {firstname,lastname,country,dob,email,password}=req.body
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            console.log(err);
        }else{
            let rdata=Usermodel({firstname,lastname,country,dob,email,password:hash})
            await rdata.save()
            res.send("user registered successfully")
        }
    });
})
userRouter.post("/login",async (req,res)=>{
    let {email,password}= req.body
    let data=await Usermodel.findOne({email})
    bcrypt.compare(password, data.password, function(err, result) {
        if(result){
            var token = jwt.sign({ userID : data._id }, process.env.key)
            res.cookie(data.firstname+" "+data.lastname, token)
            res.send({"msg":"login success","token":token})
        }else{
            console.log(err);
            res.send("wrong credentials")
        }
    });

})

module.exports=userRouter
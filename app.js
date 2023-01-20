const express=require("express")
const app=express()
const connection=require("./config/db")
const path=require("path")
require("dotenv").config()
const cors=require("cors")
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    app.use(express.static(path.join(__dirname,"client","dist")))
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
})
app.get("/admin",(req,res)=>{
    app.use(express.static(path.join(__dirname,"client","Admin")))
    res.sendFile(path.resolve(__dirname,"client","Admin","login.html"))
})
app.get("/api",(req,res)=>{
    res.send({"msg":"welcome"})
})
app.get("/signin",(req,res)=>{
    app.use(express.static(path.join(__dirname,"client","dist")))
    res.sendFile(path.resolve(__dirname,"client","dist","signin.html"))
})
app.use("/admin",require("./routes/admin.route"))
app.use("/api/user",require("./routes/user.route"))
app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("db connection established");
    } catch (error) {
        console.log(error);
    }
    console.log(`server running on port ${process.env.PORT}`);
})

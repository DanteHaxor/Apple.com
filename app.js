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
app.use(express.static(path.join(__dirname,"client","dist")))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
})
app.get("/admin",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","Admin","login.html"))
})
app.use("/admin",express.static(path.join(__dirname,"client","Admin")))
app.get("/signin",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","signin.html"))
})
app.get("/api",(req,res)=>{
    res.send({"msg":"welcome"})
})
app.use("/api/admin",require("./routes/admin.route"))
app.use("/api/user",require("./routes/user.route"))
app.use("/api/products",require("./routes/product.route"))
app.use("/api/orders",require("./routes/order.route"))
app.use("/api/cart",require("./routes/cart.route"))

app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("db connection established");
    } catch (error) {
        console.log(error);
    }
    console.log(`server running on port ${process.env.PORT}`);
})

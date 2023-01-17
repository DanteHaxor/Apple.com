const express=require("express")
const connection=require("./config/db")
const path=require("path")
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(express.static(path.join(__dirname,"./public")))
app.get("/users",(req,res)=>{
    res.send({"msg":"welcome"})
})
app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("db connection established");
    } catch (error) {
        console.log(error);
    }
    console.log(`server listening on ${process.env.PORT}`);
})
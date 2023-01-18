const express=require("express")
const app=express()
const connection=require("./config/db")
require("dotenv").config()
const cors=require("cors")
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    app.use(express.static(path.join(__dirname,"config","dist")))
    res.sendFile(path.resolve(__dirname,"config","dist","index.html"))
})
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
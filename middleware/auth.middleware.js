const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    let token=req.headers.authorization
    jwt.verify(token, process.env.key , (err, decoded)=>{
        if(err){
            console.log(err);
            res.status(404).send({ message: "please login first!" })
        }else{
                req.body.userID = decoded.userID;
                next()
        }
      })
}
module.exports = auth
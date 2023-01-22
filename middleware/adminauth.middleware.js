const adminauth=(req,res,next)=>{
    let userID =req.body.userID;
    if(userID ==="63cd29dd31b2d1508c5794d2" || userID ==="63cd2a4131b2d1508c5794d5"){
        next()
    }else{
        res.send("Not authorized")
    }
}

module.exports = adminauth
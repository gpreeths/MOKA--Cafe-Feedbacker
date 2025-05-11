require("dotenv").config()
const jwt=require('jsonwebtoken')

const authenticateToken=(req,res,next)=>{
const authHeader=req.headers.authorization
const token=authHeader && authHeader.split(' ')[1]
if(!token){
    return res.status(401).json({message:'no token provided'})
}
else{
    try{
        console.log("verifing");
        const verifiedUser=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verifiedUser
        console.log("verified");
        
        next()
        
    }
    catch(error){
        res.status(403).json({message:"invalid token"})
    }
}
}


module.exports=authenticateToken


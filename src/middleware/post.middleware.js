const userModel = require("../model/user.model")
const jwt =require("jsonwebtoken")


async function postMiddleware(req,res,next){
    const token  = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Invalid token ! Please Login Again"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_secret)
        const user = await userModel.findById(decoded._id)
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid user !Please Login again ",
            err
        })

    }
}


module.exports= postMiddleware
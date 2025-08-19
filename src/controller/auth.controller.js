const userModel = require("../model/user.model")
const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs")



async function registerController(req,res){
    const {username,password} = req.body
    const isUser = await userModel.findOne({username})
    if(isUser){
        return res.status(409).json({
            message:"User Already Exist "
        })
    }
    const user = await userModel.create({
        username,
        password : await bcrypt.hash(password,10)
    })
    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"User register successfully ",
        user:user.username
    })
}

async function loginController(req,res){
    const {username,password} =req.body
    const user = await userModel.findOne({
        username
    })
    if(!user){
        return res.status(401).json({
            message:"Invalid User "
        })
    }
    const isValidPassword = await bcrypt.compare(password,user.password)
    if(!isValidPassword){
         return res.status(401).json({
            message:"Invalid Password "
        })
    }
    const token = jwt.sign({_id:user.id},process.env.JWT_SECRET)
    res.cookie("token",token)
    return res.status(200).json({
        message:"User Login Successfully ",
        user:user.username
    })
}

module.exports={
    registerController,
    loginController
}
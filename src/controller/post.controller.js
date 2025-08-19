

const generateCaption = require("../service/ai.service");
const postModel= require("../model/post.model");
const uploadFile =require("../service/storage.service")
const {v4:uuidv4} =require("uuid")
async function createPostController(req,res){
   const file = req.file
   const base64ImageFile = new Buffer.from(file.buffer).toString("base64");

   const caption =  await generateCaption(base64ImageFile)
   const result =await uploadFile(file.buffer,`${uuidv4()}`)
   const post = await postModel.create({
      image: result.url,
      caption: caption,
      user: req.user._id
   })
    res.status(201).json({
    message:"Post Created Successfuly",
    post
   })
}


module.exports = {createPostController}
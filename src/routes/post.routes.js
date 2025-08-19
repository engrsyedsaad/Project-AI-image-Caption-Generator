const express = require("express")
const postrouter = express.Router()
const {createPostController} = require("../controller/post.controller")
const postMiddleware = require("../middleware/post.middleware")
const multer = require("multer")


const upload = multer({
    storage:multer.memoryStorage()
})

postrouter.post("/",
    postMiddleware,
    upload.single("image"),
    createPostController
)

module.exports = postrouter
const mongoose = require("mongoose")


function connectDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB is Connected")
    })
    .catch((err)=>{
        console.log('db is not connected' ,err)
    })
}

module.exports=connectDb
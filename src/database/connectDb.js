const mongoose=require('mongoose');
require('dotenv').config();

function connectDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected");
        
    })
}



module.exports=connectDb;
const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    username:{
      type:String,
      unique:[true,"username already exist"],
      required:[true, "username is required"]
    },
    email:{
type:String,
      unique:[true,"email already exist"],
      required:[true, "email is required"]
    },
    password:{
type:String,
      required:[true, "password is required"]
    },
    bio:String,
    
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/8629896256/ik-genimg-prompt-create%20a%20default%20profile%20picture%20image/8c78c9d4-6fec-4339-a2ef-826f482492dc/image.jpg?tr=f-jpg%2Ch-1024%2Cw-1024&ik-s=9343d8d53337c4e3dd79f7918455943cfa4afa22'
},



})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;
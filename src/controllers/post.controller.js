const postModel=require("../models/post.model");
const ImageKit=require('@imagekit/nodejs');
const {toFile}=require('@imagekit/nodejs');
require('dotenv').config();
const jwt=require('jsonwebtoken');


const imageKit=new ImageKit({
 privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})


async function createPostController(req,res){
    console.log(req.body,req.file);

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }

let decoded;
    try{
     decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        res.send(401).json({
            message:"User not authorized "
        })
    }



    const file=await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"Insta-clone-posts"
    })

const post =await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:decoded.id
})

res.status(201).json({
    message:"Post created sucessfull",
    post
})
}



//GET REQUEST
async function getPostcontroller(req,res){

    const token=req.cookies.token;

    let decoded;

    try{
   decoded= jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message:"Token invalid"
        })
    }
const userId=decoded.id;

const posts=await postModel.find({
    user:userId
})

res.status(200).json({
    message:"post fetched sucessfully",
    posts
})

}


// /api/posts/details/:userid

async function getPostDetails(req,res){

let token=req.cookies.token;

let decoded;
try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
}catch(err){
    return res.status(401).json({
        message:"invalid token"
    })
}

const userId=decoded.id;
const postId=req.params.postId;

const post =await postModel.findById(postId)

if(!post){
   
    return res.status(404).json({
        message:"post not found "
    })
}

const isValidUser=post.user.toString() === userId

if(!isValidUser){
    return res.status(403).json({
        message:"Forbidden Format"
    })
}

return res.status(200).json({
    message:"post fetched sucessfully",
    post
})

}




module.exports={
    createPostController,
    getPostcontroller,
    getPostDetails
}


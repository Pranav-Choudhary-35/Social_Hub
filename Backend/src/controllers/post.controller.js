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

   


    const file=await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"Insta-clone-posts"
    })

const post =await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
})

res.status(201).json({
    message:"Post created sucessfull",
    post
})
}



//GET REQUEST
async function getPostcontroller(req,res){


const userId=req.user.id;

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



const userId=req.user.id;
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


//api/posts/like/:postid
async function likePostController(req,res){

    const userId=req.user.id;
    const postId=req.params.postId;

    const post=await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    if(post.likes.includes(userId)){
        return res.status(200).json({
            message:"you have already liked this post"
        })
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
        message:"post liked successfully",
        post
    })

}

module.exports={
    createPostController,
    getPostcontroller,
    getPostDetails,likePostController
}


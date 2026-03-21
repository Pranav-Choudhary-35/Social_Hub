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

    const token=req.cookies("token");

    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }


    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
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


module.exports={
    createPostController
}

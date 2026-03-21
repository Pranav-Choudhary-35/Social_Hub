const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/schema');

//register route

async function  register(req, res){
    const { email, username, password, bio, profileImage } = req.body;

    // check if user exists
    const ifUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (ifUserExist) {
        return res.status(409).json({
            message: "This User already exists"
        });
    }

    // hash password
    const hash =await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    });

    // create token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // set cookie + response
    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}



//login route

async function loginController(req,res){
const {username,email,password}=req.body;

const user=await userModel.findOne({
    $or:[
        {
            username:username
        },
        {
            email:email
        }
    ]
})
if(!user){
    res.status(404).json({
message:"user not found"
    });
}

// const hash = bcrypt.hash(password,10);

const isPasswordValid=await bcrypt.compare(password,user.password);

if(!isPasswordValid){
    return res.status(401).json({
        message:"password invalid"
    })
}

const token=jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
);

res.cookie("token",token);

res.status(200).json({
    message:"user login sucessfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
})

};



module.exports={
    register,
    loginController
}
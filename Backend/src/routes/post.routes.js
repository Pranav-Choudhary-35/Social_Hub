const express=require('express');
const postRouter=express.Router();
const postController=require('../controllers/post.controller')
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const identifyUser=require('../middleware/auth.middleware');

//POST  /api/posts {protected}

postRouter.post('/',upload.single("image"),identifyUser, postController.createPostController);

//GET  /api/posts/  [protected]


/**
 * @route //GET /api/posts/details/:postid
 * @desc return detail about specific post with the id.also check whether the post belongs to the user that is requesting
 */
postRouter.get("/",identifyUser,postController.getPostcontroller);

postRouter.get('/details/:postId',identifyUser,postController.getPostDetails)

/**
 * @route //GET /api/posts/like/:postid
 * @desc like a post with the given id by the user that is requesting
 */
postRouter.get('/like/:postId',identifyUser,postController.likePostController);


module.exports=postRouter;
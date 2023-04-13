import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAllPost } from '../controllers/PostsController.js';

const postRouter = new Router();

//Create Post
//api/posts/
postRouter.post('/', checkAuth, createPost);

//Get All Posts
//api/posts/
postRouter.get('/', getAllPost);

export default postRouter;

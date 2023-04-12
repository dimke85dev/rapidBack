import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost } from '../controllers/PostsController.js';

const postRouter = new Router();

//Create Post
//api/posts/
postRouter.post('/', checkAuth, createPost);

export default postRouter;

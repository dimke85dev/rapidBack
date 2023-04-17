import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createPost,
  getAllPost,
  getPostById,
} from '../controllers/PostsController.js';

const postRouter = new Router();

//Create Post
//api/posts/
postRouter.post('/', checkAuth, createPost);

//Get All Posts
//api/posts/
postRouter.get('/', getAllPost);

//Get Post By Id
//api/posts/:id
postRouter.get('/:id', getPostById);

export default postRouter;

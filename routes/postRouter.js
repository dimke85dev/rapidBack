import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
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

//Get My Posts
//api/posts/user/me
postRouter.get('/user/me', checkAuth, getMyPosts);

//Remove Post
//api/posts/:id
postRouter.delete('/:id', checkAuth, removePost);

//Update Post
//api/posts/:id
postRouter.put('/:id', checkAuth, updatePost);

//Get Post Comments
//api/posts/comments/:id
postRouter.get('/comments/:id', getPostComments);

export default postRouter;

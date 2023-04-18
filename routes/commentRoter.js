import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createComment } from '../controllers/CommentsController.js';

const commentRouter = new Router();

//Create Comment
//api/comments/:id
commentRouter.post('/:id', checkAuth, createComment);

export default commentRouter;

import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import AuthController from '../controllers/AuthController.js';

const authRouter = new Router();

//Registration
authRouter.post('/register', AuthController.register);
//Login
authRouter.post('/login', AuthController.login);
//Get me
authRouter.get('/me', checkAuth, AuthController.getMe);
//Get All Users
authRouter.get('/users', checkAuth, AuthController.getUsers);

export default authRouter;

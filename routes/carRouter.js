import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createCar, getCar } from '../controllers/carController.js';

const carRouter = new Router();

//Add New Car
carRouter.post('/newcar', createCar);
//uodate car
// carRouter.post('/updatecar', carController.login);
// //Get car
carRouter.post('/carvin', checkAuth, getCar);

export default carRouter;

import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createCar, getCar } from '../controllers/carController.js';

const carTypeRepairRouter = new Router();

//Add New Main Repair
carTypeRepairRouter.post('/newtyperepair', checkAuth, createCar);
//uodate car
// carRouter.post('/updatecar', carController.login);
// //Get car
carTypeRepairRouter.get('/typerepair', checkAuth, getCar);

export default carTypeRepairRouter;

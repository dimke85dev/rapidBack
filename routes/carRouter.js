import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createCar,
  getCar,
  getAllCars,
  getCarById,
} from '../controllers/carController.js';

const carRouter = new Router();

//Add New Car
carRouter.post('/newcar', checkAuth, createCar);
//uodate car
// carRouter.post('/updatecar', carController.login);
// //Get car
carRouter.post('/carvin', checkAuth, getCar);
carRouter.post('/carid', checkAuth, getCarById);

carRouter.get('/allcars', checkAuth, getAllCars);

export default carRouter;

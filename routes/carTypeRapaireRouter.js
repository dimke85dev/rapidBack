import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createTypeRepair,
  getAllTypeRepairs,
  getTypeRepairById,
  removeTypeRepair,
  updateTypeRepair,
} from '../controllers/CarTypeRepairController.js';

const carTypeRepairRouter = new Router();

//Add New Main Repair
carTypeRepairRouter.post('/', checkAuth, createTypeRepair);
// //Get Post By Id
// //api/Typerepair/:id
carTypeRepairRouter.post('/gettype', getTypeRepairById);

carTypeRepairRouter.get('/getalltype', getAllTypeRepairs);

//Remove Type Repair
//api/Typerepair/:id
carTypeRepairRouter.delete('/:id', checkAuth, removeTypeRepair);

//Update Post
//api/Typerepair/:id
carTypeRepairRouter.put('/:id', checkAuth, updateTypeRepair);

export default carTypeRepairRouter;

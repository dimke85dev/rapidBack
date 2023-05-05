import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createMainRepair,
  getMainRepairById,
  getAllMainRepairs,
  removeMainRepair,
  updateMainRepair,
  getTypeRepair,
} from '../controllers/CarMainRepairController.js';

const carMainRepairRouter = new Router();

//Add New Main Repair
carMainRepairRouter.post('/', checkAuth, createMainRepair);
//uodate car
// carRouter.post('/updatecar', carController.login);
// //Get car
carMainRepairRouter.get('/', getAllMainRepairs);

// //Get Post By Id
// //api/mainrepair/:id
carMainRepairRouter.get('/:id', getMainRepairById);

//Remove MAin Repair
//api/mainrepair/:id
carMainRepairRouter.delete('/:id', checkAuth, removeMainRepair);

//Update Post
//api/mainrepair/:id
carMainRepairRouter.put('/:id', checkAuth, updateMainRepair);

//Get Post Comments
//api/posts/comments/:id
carMainRepairRouter.get('/typerepair/:id', getTypeRepair);

export default carMainRepairRouter;

import { Router } from 'express';
import CarRepairController from '../controllers/CarRepairController.js';

const carRepairRouter = new Router();

carRepairRouter.post('/takeacar', CarRepairController.create);
carRepairRouter.get('/takeacar', CarRepairController.getAll);
carRepairRouter.get('/takeacar/:id', CarRepairController.getOne);
carRepairRouter.put('/takeacar', CarRepairController.update);
carRepairRouter.delete('/takeacar/:id', CarRepairController.delete);

export default carRepairRouter;

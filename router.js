import { Router } from 'express';
import PostController from './PostController.js';

const router = new Router();

function One() {
  console.log((Math.random(1) * 9 + 1).toFixed(0));
}
One();

router.post('/takeacar', PostController.create);
router.get('/takeacar', PostController.getAll);
router.get('/takeacar/:id', PostController.getOne);
router.put('/takeacar', PostController.update);
router.delete('/takeacar/:id', PostController.delete);

export default router;

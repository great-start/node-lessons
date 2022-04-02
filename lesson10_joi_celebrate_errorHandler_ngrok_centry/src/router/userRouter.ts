import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.get('/:email', userController.getUserByEmail); // TODO create controller
router.post('/', userController.createUser); // TODO create controller

export const userRouter = router;

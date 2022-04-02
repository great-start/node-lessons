import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware } from '../middlewares';
import { authValidator } from '../validators';

const router = Router();

router.post('/registration', authController.registration); // когда при регистрации сразу логинация идет
router.post('/login', celebrate(authValidator.login), userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;

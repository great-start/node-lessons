import { Router } from 'express';

import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware, filesMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', filesMiddleware.checkUserAvatar, authController.registration); // когда при регистрации сразу логинация идет
router.post('/login', authMiddleware.isLoginValid, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;

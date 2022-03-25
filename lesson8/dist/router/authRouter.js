"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/registration', authController_1.authController.registration); // когда при регистрации сразу логинация идет
router.post('/login', middlewares_1.userMiddleware.checkIsUserExist, authController_1.authController.login);
router.post('/logout', middlewares_1.authMiddleware.checkAccessToken, authController_1.authController.logout);
// router.post('/refresh', authController.registration);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        res.cookie('refreshToken', data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        // console.log(req.cookies);
        console.log(req.user);
        // console.log(req.get('Authorization'));
        // console.log(req.get('cookie'));
        // console.log(req.query);
        // res.clearCookie('Ok');
        await services_1.tokenService.deleteUserTokenPair(id);
        return res.json('OK');
    }
    async login(req, res) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.userService.compareUserPassword(password, hashPassword);
            const { refreshToken, accessToken } = await services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
            // throw new Error();
            // res.json('OK');
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map
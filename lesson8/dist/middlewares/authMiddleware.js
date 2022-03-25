"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                throw new Error('No token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(accessToken);
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ accessToken });
            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Token not valid');
            }
            // расширение объекта Response
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map
import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { constant } from '../constants/constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) {
                throw new Error('No token');
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            // расширение объекта Response
            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constant.AUTHORIZATION);

            if (!refreshToken) {
                throw new Error('No refreshToken');
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!userFromDB) {
                throw new Error('Token not valid');
            }

            req.user = userFromDB;
            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

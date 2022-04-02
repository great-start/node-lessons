import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { constants } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                next('No token');
                return;
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next('Token not valid');
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next('Token not valid');
                return;
            }

            // расширение объекта Response
            req.user = userFromToken;

            next();
        } catch (e: any) {
            // res.json({
            //     status: 400,
            //     message: e.message,
            // });
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                next('No refreshToken');
                return;
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next('Token not valid');
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!userFromDB) {
                next('Token not valid');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e: any) {
            // res.json({
            //     status: 400,
            //     message: e.message,
            // });
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

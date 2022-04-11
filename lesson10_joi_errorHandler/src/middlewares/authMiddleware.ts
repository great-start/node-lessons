import { NextFunction, Request, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { constants } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';
import { authValidator } from '../validators';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler('No token', 400));
                return;
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
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
                next(new ErrorHandler('No refreshToken', 401));
                return;
            }

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!userFromDB) {
                next(new ErrorHandler('Token not valid', 401));
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

    public isLoginValid(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            // console.log(value);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            // console.log(req.body);
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

import { NextFunction, Request, Response } from 'express';
import { authService, tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        // console.log(req.cookies);
        console.log(req.user);
        // console.log(req.get('Authorization'));
        // console.log(req.get('cookie'));
        // console.log(req.query);

        // res.clearCookie('Ok');

        await tokenService.deleteUserTokenPair(id);
        return res.json('OK');
    }

    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });

            // throw new Error();
            // res.json('OK');
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;

            await tokenService.deleteUserTokenPair(id);

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();

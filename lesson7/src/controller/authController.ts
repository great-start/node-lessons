import { Request, Response } from 'express';
import { authService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';

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
}

export const authController = new AuthController();

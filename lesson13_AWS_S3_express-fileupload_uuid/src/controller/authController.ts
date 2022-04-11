import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    authService, emailService, tokenService, userService, s3Service,
} from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';
// import { emailService } from '../services/emailService';
import { EmailActionEnum } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { firstName, email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getUserByEmail(email);

            if (userFromDb) {
                next(new ErrorHandler(`User with email: ${email} already exists`));
            }

            const createdUser = await userService.createUser(req.body);

            // UPLOAD FILE
            if (avatar) {
                const sendData = await s3Service.upload(avatar, 'user', createdUser.id);

                console.log(sendData.Location); // адрес в интернете загруженного файла

            // write now we have to update user in db
            }

            const tokenData = await authService.registration(createdUser);

            await emailService.sendEmail(EmailActionEnum.REGISTRATION, tokenData.userEmail, { username: firstName });
            // await emailTemplate.sendTemplateEmail(EmailActionEnum.REGISTRATION, data.userEmail);

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
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
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendEmail(EmailActionEnum.WELCOME, email, { username: firstName });
            // await emailTemplate.sendTemplateEmail(EmailActionEnum.WELCOME, email);
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

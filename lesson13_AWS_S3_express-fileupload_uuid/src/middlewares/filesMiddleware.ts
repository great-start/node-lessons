import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/ErrorHandler';
import { constants } from '../constants';

class FilesMiddleware {
    async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            console.log(req.files);

            if (!req.files?.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar as UploadedFile;

            if (size > constants.PHOTO_MAX_SIZE) {
                next(new ErrorHandler('File is too big'));
                return;
            }

            if (!constants.PHOTOS_MIMETYPE.includes(mimetype)) {
                next(new ErrorHandler('Wrong file format'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const filesMiddleware = new FilesMiddleware();

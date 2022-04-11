import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { config } from '../config';

class S3Service {
    bucket;

    constructor() {
        this.bucket = new S3({
            region: config.S3_REGION,
            accessKeyId: config.S3_ACCESS_KEY,
            secretAccessKey: config.S3_SECRET_KEY,
        });
    }

    upload(file: UploadedFile, itemType: string, itemId: number): Promise<ManagedUpload.SendData> {
        const uploadFilePath = this.fileNameBuilder(file.name, itemType, itemId);

        return this.bucket.upload({
            Bucket: config.S3_BUCKET_NAME as string,
            Key: uploadFilePath,
            ContentType: itemType,
            Body: file.data,
            ACL: 'public-read',
        })
            .promise(); // !!!!!!!!!! обязательно промис в конце
    }

    private fileNameBuilder(fileName: string, itemType: string, itemId: number): string {
        const fileExtension = path.extname(fileName); // возвращает расширение файла

        return `${itemType}/${itemId}/${uuidv4()}${fileExtension}`;
    }
}

export const s3Service = new S3Service();

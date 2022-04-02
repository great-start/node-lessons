import { createTransport } from 'nodemailer';
import { config } from '../config';

class EmailService {
    async sendEmail(userMail = '') {
        const emailTransporter = createTransport({
            from: '',
            to: userMail,
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        await emailTransporter.sendMail({
            to: userMail,
            subject: 'Hello. It is Kolya messaging to you',
            html: 'HELLO WORLD',
        });
    }
}

export const emailService = new EmailService();

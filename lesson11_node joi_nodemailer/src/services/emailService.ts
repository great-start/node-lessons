import { createTransport } from 'nodemailer';

import { config } from '../config';
import { emailActionEnum, emailInfo } from '../constants';

const emailTransporter = createTransport({
    from: 'From Node-website',
    service: 'Gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
});

class EmailService {
    async sendEmail(action : emailActionEnum, userMail = '') {
        const { subject, html } = emailInfo[action];

        await emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();

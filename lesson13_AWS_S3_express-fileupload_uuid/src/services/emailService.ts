import { createTransport, SentMessageInfo } from 'nodemailer';
import Email from 'email-templates';

import path from 'path';
import { config } from '../config';
import { constants, EmailActionEnum, emailInfo } from '../constants';

export const emailTransporter = createTransport({
    from: 'From Node-website',
    service: 'Gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
});

class EmailService {
    // emailRootDir = path.join(__dirname, '../', constants.EMAIL_TEMPLATES_DIR);

    async sendEmail(action: EmailActionEnum, userMail = '', locals = {}): Promise<SentMessageInfo> {
        const { subject, template } = emailInfo[action];

        // const newLocals = { locals, frontendUrl: constants.FRONTEND_URL };

        Object.assign(locals, { frontendUrl: constants.FRONTEND_URL });

        // let rootDir = 'src';
        //
        // if (config.NODE_ENV === 'prod') {
        //     rootDir = 'dist';
        // }

        // const dir = path.join(process.cwd(), rootDir, constants.EMAIL_TEMPLATES_DIR, template);

        const dir = path.join(__dirname, '../', constants.EMAIL_TEMPLATES_DIR, template);

        const renderedEmail = await new Email().render(dir, locals);

        await emailTransporter.sendMail({
            to: userMail,
            subject,
            html: renderedEmail,
            // subject,
            // html: templateName,
        });
    }
}

export const emailService = new EmailService();

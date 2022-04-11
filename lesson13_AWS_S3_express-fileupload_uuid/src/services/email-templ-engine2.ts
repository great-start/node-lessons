import path from 'path';
import Email from 'email-templates';

import { emailTransporter } from './emailService';
import { EmailActionEnum } from '../constants';

class EMailTemplate {
    async sendTemplateEmail(action: EmailActionEnum, email = '') {
        // const dir = path.join(process.cwd(), 'email-templates/welcome');
        const dir = path.join(process.cwd(), 'src/email-templates/welcome');

        console.log(dir);

        const emailEngine = new Email({
            transport: emailTransporter,
            send: true,
            message: {
                to: email,
            },

        });

        const renrededEmail = await emailEngine.render(dir, { username: 'Kolya' });

        console.log(renrededEmail);

        // await emailEngine.send({
        //     template: dir,
        // });
    }
}

export const emailTemplate = new EMailTemplate();

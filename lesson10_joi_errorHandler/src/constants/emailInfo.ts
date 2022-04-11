import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome back',
        html: 'Welcome user',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Blocked',
        html: 'Your account is blocked',
    },

    [emailActionEnum.REGISTRATION_SUCCESSFULL]: {
        subject: 'Registration successful',
        html: 'you have been successfully registered',
    },
};

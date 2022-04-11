import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to node.js',
        template: 'welcome',
    },

    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Blocked',
        template: 'blocked',
    },

    [EmailActionEnum.REGISTRATION]: {
        subject: 'Registration successful',
        template: 'registration',
    },
};

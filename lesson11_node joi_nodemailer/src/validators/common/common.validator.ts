import Joi from 'joi';

import { constants } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string().regex(constants.EMAIL_REGEXP).message('Email not valid'),
    passValidator: Joi.string().required().min(8).message('Min 8 characters'),
};

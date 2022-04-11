import Joi from 'joi';

import { commonValidator } from '../common';

// const carSubSchema = Joi.object({   // пример валидации массива объектов
//     model: Joi.string(),
// });

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.trim(),
        password: commonValidator.passValidator.trim(),
        // password: Joi.string().required().min(8).error('Password not valid'),   // joi error
        // cars: Joi.array().items(carSubSchema).min(2).max(30),   // пример валидации массива с min 2, max 30 елементов
    }),
};

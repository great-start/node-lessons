import { Joi, Segments } from 'celebrate';
import { commonValidator } from '../common/common.validator';

// const carSubSchema = Joi.object({   // пример валидации массива объектов
//     model: Joi.string(),
// });

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            email: commonValidator.emailValidator,
            password: Joi.string().required().min(8),
            // password: Joi.string().required().min(8).error('Password not valid'),   // joi error
            // cars: Joi.array().items(carSubSchema).min(2).max(30),   // пример валидации массива с min 2, max 30 елементов
        }),
    },
};

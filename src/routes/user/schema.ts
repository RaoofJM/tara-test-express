import Joi from 'joi';

export default {
  create: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().required(),
    gender: Joi.string().valid('MALE', 'FEMALE').required(),
  }),
  update: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
  }),
};

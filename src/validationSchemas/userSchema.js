import * as Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).max(30).required(),
});

export const SignupSchema = Joi.object({
  firstName : Joi.string().min(3).max(30).required(),
  lastName : Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(15)
    .required(),
  passwordConfirm: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({
      'any.only': '{{#label}} does not match the password',
    }),
});

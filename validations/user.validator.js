const Joi = require("joi");
//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$/;
const userValidationSchema = Joi.object().keys({
  fullName: Joi.string().default("").max(50),
  username: Joi.string().required().max(25),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  //password: Joi.string().required().pattern(new RegExp(passwordRegex)),
  password: Joi.string().required().min(8).max(16),
});

const loginValidationSchema = Joi.object().keys({
  username: Joi.string().required().max(25),
  password: Joi.string().required().min(8).max(16),
});

module.exports = { userValidationSchema, loginValidationSchema };

const Joi = require("joi");

const loginBodyValidationSchema = Joi.object().keys({
  username: Joi.string().required().max(25),
  password: Joi.string().required().min(8).max(16),
});

module.exports = loginBodyValidationSchema;

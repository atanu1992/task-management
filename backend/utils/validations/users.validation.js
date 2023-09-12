const {
  Joi,
  joiOptions,
  errorsFormatter,
  sanitizeUserInput,
} = require('../../middlewares/validation-and-sanitisation');

const addUserValidationSchema = (userInput) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(12).required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const userLoginValidationSchema = (userInput) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

module.exports = {
  addUserValidationSchema,
  userLoginValidationSchema,
};

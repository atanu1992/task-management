const {
  Joi,
  joiOptions,
  errorsFormatter,
  sanitizeUserInput,
} = require('../../middlewares/validation-and-sanitisation');

const addTaskValidationSchema = (userInput) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .required(),
    description: Joi.string().trim().required(),
    priority: Joi.string().trim().valid('low', 'medium', 'high').required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const taskIdValidationSchema = (userInput) => {
  const idSchema = Joi.object({
    id: Joi.string().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = idSchema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const updateTaskSchema = (userInput) => {
  const schema = Joi.object({
    id: Joi.string().trim().required(),
    title: Joi.string()
      .trim()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .required(),
    description: Joi.string().trim().required(),
    priority: Joi.string().trim().valid('low', 'medium', 'high').required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

module.exports = {
  addTaskValidationSchema,
  taskIdValidationSchema,
  updateTaskSchema,
};

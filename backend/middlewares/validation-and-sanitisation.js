const Joi = require('joi'); // form valiadation
const sanitizeHtml = require('sanitize-html'); // remove html tags and other things

const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

// sanitise user input for simple object
const sanitizeUserInput = (userInput) => {
  Object.keys(userInput).forEach((key) => {
    // Check if the value is a number (parsed as a float)
    if (!isNaN(parseFloat(userInput[key])) && isFinite(userInput[key])) {
      // Convert back to a number
      userInput[key] = parseFloat(userInput[key]);
    } else {
      // If it's not a number, sanitize as a string
      userInput[key] = sanitizeHtml(userInput[key]);
    }
  });
  return userInput;
};

// generate proper error message from joi
const errorsFormatter = (errors) => {
  if (errors?.details && Array.isArray(errors.details)) {
    let formattedErrorsArray = [];
    errors.details.forEach((element) => {
      let { context, message } = element;
      message = message.replace(/['"]+/g, '');
      message = message.replace(/[_]+/g, +' ');
      message = message.toLowerCase();
      formattedErrorsArray.push({
        field_name: context.label,
        message: message,
      });
    });
    return formattedErrorsArray.length
      ? { errors: formattedErrorsArray }
      : null;
  }
  return null;
};

module.exports = { Joi, joiOptions, errorsFormatter, sanitizeUserInput };

const {
  addUserValidationSchema,
  userLoginValidationSchema,
} = require('../utils/validations/users.validation');

const {
  addNewUserService,
  authenticateUser,
  getUserDetailsById,
} = require('../services/users.service');

/**
 * Create new user
 * @param {name, email, password} req
 * @returns object
 */
exports.addUser = async (req, res, next) => {
  try {
    const { value, errors } = addUserValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const newUser = await addNewUserService(value);
    res.cookie('x-refresh-token', newUser.refreshToken, {
      maxAge: newUser.refreshTokenTimeInSeconds,
      httpOnly: true,
    });
    const { refreshToken, refreshTokenTimeInSeconds, ...details } = newUser;
    return res.status(201).json({ status: true, details: details });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticate user
 * @param {email, password} req
 * @returns object
 */
exports.login = async (req, res, next) => {
  try {
    const { value, errors } = userLoginValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const userDetails = await authenticateUser(value);
    return res.status(200).json({ status: true, details: userDetails });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { userId } = req;
    const userDetails = await getUserDetailsById(userId, 'create_token');
    return res.status(200).json({ status: true, details: userDetails });
  } catch (error) {
    next(error);
  }
};

const { verifyEncryptedCode } = require('../middlewares/bcrypt');
const { CustomError } = require('../middlewares/error-handler');
const { createToken } = require('../middlewares/jwt');
const UsersModel = require('../models/users.model');

/**
 * Add new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns object
 */
exports.addNewUserService = async (data) => {
  try {
    // check user email exists
    const user = await UsersModel.findOne({ email: data.email }).exec();
    if (user) {
      throw new CustomError('Email already exists', 409);
    }

    // insert record
    const newUser = await UsersModel.create(data);
    if (newUser?._id) {
      // create token
      const tokens = await createToken(newUser._id);
      tokens.name = newUser.name;
      return tokens;
    } else {
      throw new CustomError('Failed to add user', 500);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Authenticate user
 * @param {string} email
 * @param {string} password
 * @returns object
 */
exports.authenticateUser = async (data) => {
  try {
    const { email, password } = data;
    // check user email exists
    const user = await UsersModel.findOne({ email: email }).exec();
    if (!user) {
      throw new CustomError('User account didnot exists', 409);
    }

    // check database password match with input password
    const verifyPassword = await verifyEncryptedCode(password, user.password);

    if (!verifyPassword) {
      throw new CustomError('Invalid credentials', 409);
    }
    // create token
    const tokens = await createToken(user._id);
    tokens.name = user.name;
    return tokens;
  } catch (error) {
    throw error;
  }
};

exports.getUserDetailsById = async (id, addTokenDetails = false) => {
  const user = await UsersModel.findOne({ _id: id }).exec();
  if (!user) {
    throw new CustomError('User account didnot exists', 409);
  }
  if (!addTokenDetails) {
    return user;
  }
  // create token
  const tokens = await createToken(user._id);
  tokens.name = user.name;
  return tokens;
};

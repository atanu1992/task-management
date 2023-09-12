const bcrypt = require('bcrypt');
const saltRounds = 10;

// Generate encrypted code
const generateEncryptedCode = async (normalString) => {
  try {
    const hashedPassword = await bcrypt.hash(normalString, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw Error(err.message ? err.message : 'Failed to encryt password');
  }
};

// Function to verify code
const verifyEncryptedCode = async (inputCode, hashedCodeFromDB) => {
  const isPasswordValid = await bcrypt.compare(inputCode, hashedCodeFromDB);
  return isPasswordValid;
};

module.exports = { generateEncryptedCode, verifyEncryptedCode };

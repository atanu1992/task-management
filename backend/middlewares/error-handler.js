// Custom error class with error message and code
class CustomError extends Error {
  constructor(errorMessage, errorCode) {
    super(errorMessage);
    this.name = 'Error';
    this.errorCode = errorCode;
  }
}

module.exports = { CustomError };

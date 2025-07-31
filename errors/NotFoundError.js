const GeneralError = require('./GeneralError');

class NotFound extends GeneralError {
  constructor(message,detail) {
    super( message,400, detail);
  }
}

module.exports = NotFound;

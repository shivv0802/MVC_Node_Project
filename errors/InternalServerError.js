const GeneralError = require('./GeneralError')


class InternalServerError extends GeneralError {
    constructor(message,detail) {
        super(message, 500, detail)
    }
}

module.exports = InternalServerError
const GeneralError = require('./GeneralError')

class UnauthorizedError extends GeneralError{  // BadRequest
    constructor(message, detail){
        super(message, 401,detail)
        
    }
}

module.exports = UnauthorizedError
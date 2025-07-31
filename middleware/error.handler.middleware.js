const GeneralError = require('../errors/GeneralError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
   console.log(err)
    return res.status(err.statusCode).json({ code: err.statusCode,
      message: err.message,
      error: err.detail });
  }
  


  
  return res.status(500).json({code: err.statusCode,message: "Internal Server Error", error: "Internal Server Error" });
};

module.exports = errorHandler;
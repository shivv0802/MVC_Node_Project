const User = require('../models/user.models');
const UnauthorizedError = require('../errors/UnauthorizedError') 
const NotFoundError = require('../errors/NotFoundError')


const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateAndAuthorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new UnauthorizedError("Unauthorized", "Authorization header is missing or malformed"));
      }

      const token = authorization.split(' ')[1];

      if (!token) {
        return next(new UnauthorizedError("Unauthorized", "Token not provided"));
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
       
        return next(new UnauthorizedError("Unauthorized", "JWT is malformed or invalid"));
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new NotFoundError("NotFound", "User not found"));
      }

      req.user = user;

      if (!allowedRoles.includes(user.role)) {
        return next(new UnauthorizedError("Unauthorized", "Access denied User Cannot have access to DB"));
      }

      next();

    } catch (err) {
      return next(err);
    }
  };
};




module.exports = {authenticateAndAuthorize};

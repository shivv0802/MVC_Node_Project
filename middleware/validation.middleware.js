const { checkSchema, validationResult } = require('express-validator');
const User = require('../models/user.models');
const BadRequest = require('../errors/BadRequest');

const validateUserData = [
  checkSchema({
    name: {
      isLength: {
        options: { min: 4 },
        errorMessage: 'Name is required and must be at least 4 characters'
      }
    },
    email: {
      isEmail: {
        errorMessage: 'Enter a valid email'
      },
      custom: {
        options: async (value, { req }) => {
          const existingUser = await User.findOne({ email: value });
          if (existingUser) {
            throw new Error('Email already exists'); // Only email duplication check
          }
        }
      }
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 characters'
      }
    },
    role: {
      optional: true,
      isIn: {
        options: [['admin', 'user']],
        errorMessage: 'Role must be either admin or user'
      }
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      return next(new BadRequest('Bad Request', errorMessages));
    }
    next();
  }
];

module.exports = { validateUserData };

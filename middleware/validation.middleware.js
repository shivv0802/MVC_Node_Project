const User = require('../models/user.models');


const { checkSchema, validationResult } = require('express-validator');


const validateUserData = [
  checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Enter a valid email'
      },
      custom: {
        options: async (value) => {
          const user = await User.findOne({ email: value });
          if (user) {
            return Promise.reject('Email already exists');
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
    
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code : 400,
        msg: "Validation failed",
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = { validateUserData };

/*const validateUserData = [
  body('email').isEmail().withMessage("enter a valid email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('password').isLength({min : 8}).withMessage("Password should be greater than 8 characters"), 
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({msg : "Invalid Credentials", errors : errors.array()})
    }
    next();
  }
]
  */


/*function validateUserData(req, res, next) {
  const { name, email, password } = req.body;  

  const errors = [];

  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please provide a valid email address.");
  }


  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least one letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}*/


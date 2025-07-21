const { body, validationResult} = require('express-validator');


const validateUserData = [
  body('email').isEmail().withMessage("enter a valid email"),
  body('password').isLength({min : 8}).withMessage("Password should be greater than 8 characters"), 
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({msg : "Invalid Credentials", errors : errors.array()})
    }
    next();
  }
]


/*
//"This is Custom validation and the above is express validations".

function validateUserData(req, res, next) {
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

module.exports = { validateUserData };

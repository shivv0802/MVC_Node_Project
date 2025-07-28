const User = require('../models/user.models');


const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateAndAuthorize = (...allowedRoles) => {
  return async (req,res,next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ code: 401, message: "Authorization header missing or malformed", error: error.message });
  }

  const token = authorization.split(' ')[1];



  if (!token) {
    return res.status(401).json({ code: 401, message: "token not found", error: error.message });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    //console.log("Fetched user from DB:", user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user;
    if(!allowedRoles.includes(user.role)){
      return res.status(403).json({code : 403, message : "User cannot have access to database"})
    }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}
}



module.exports = {authenticateAndAuthorize};

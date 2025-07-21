function validateUserData(req, res, next) {
  const { username, email, password } = req.body;  // Assuming data is in the body

  const errors = [];

  // Validate username
  

  // Validate email
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  // Validate password
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least one letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  // If errors are found, send a response with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, move to the next middleware or route handler
  next();
}

module.exports = { validateUserData };

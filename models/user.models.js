const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,

  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }

});
const User = mongoose.model('User', userSchema);
module.exports = User
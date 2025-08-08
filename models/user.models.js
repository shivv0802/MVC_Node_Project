const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true ,
    trim: true,
   
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
  },
   mobiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mobile'
  }]

});
const User = mongoose.model('User', userSchema);
module.exports = User
const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Mobile = mongoose.model('Mobile', mobileSchema);
module.exports = Mobile;
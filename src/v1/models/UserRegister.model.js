const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    username: { type: String, requied: true, unique: true },
    hashedPassword: { type: String, requied: true },
    email: { type: String, requied: true, unique: true },
  designation:{type: String, requied: true,}
  
  },
  { timestamps: true },
);

module.exports = mongoose.model('Users', User)

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: 'Please enter a valid email address.'
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message: 'Password must be strong (min 8 chars, include uppercase, lowercase, number, symbol).'
      }
    }
  },
  {
    timestamps: true
  }
);

//Method to generate JWT token
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET, // 
    { expiresIn: '7d' }
  );
  return token;
};

// Method to validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isMatch = await bcrypt.compare(passwordInputByUser, user.password);
  return isMatch;
};

//  Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = { User };

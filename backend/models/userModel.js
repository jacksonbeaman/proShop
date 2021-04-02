import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } // automatically generate updatedAt and createdAt fields
);

// add methods to the model
// this.password is used because we call the matchPassword method on a specific user in model
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// add mongoose middleware to hash password
// User.create() in userController is basically syntactic sugar for .save method
userSchema.pre('save', async function (next) {
  // only hash the password if the password field is modified
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // the password of the user we are creating
});

const User = mongoose.model('User', userSchema);

export default User;

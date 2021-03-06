import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
// error handler so we don't need a trycatch in all of our database calls in all of our routes
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public - no token necessary - i.e. you don't need to be logged in
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // destructure data submitted in the body

  // find one document / row by email
  const user = await User.findOne({ email: email });

  // matchPassword method is defined in userModel.js
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // after authentication, we will send back a token that includes the user's id embedded in the payload
    });
  } else {
    res.status(401); // 401 is unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Register new user
// @route   POST /api/users/
// @access  Public - no token necessary - i.e. you don't need to be logged in
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // destructure data submitted in the body

  // Check if user exists - find one document / row by email
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400); // status code 400 means bad request
    throw new Error('User already exists');
  }

  // User.create() is basically syntactic sugar for .save method in our userModel
  const user = await User.create({
    name,
    email,
    password,
  });

  // if the user is successfully created
  if (user) {
    // 201 means something was created
    // we are sending the same json data as we would with a successful login, we are essentially authenticating as soon as we register
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // status code 400 means bad request
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private - can only run this function / access this route, if next() in protect runs successfully
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private - can only run this function / access this route, if next() in protect runs successfully
const updateUserProfile = asyncHandler(async (req, res) => {
  // we have access to user object in req.user - including user._id - in all of our protected routes
  // our _id was returned in the payload from jwt.verify() - our decoded jwt payload returned the _id in payload post authentication - in protect from authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // or user.name remains the same
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private / Admin
const getUserById = asyncHandler(async (req, res) => {
  // req.params.id - the id in the URL
  // select('-password') - don't fetch the password
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private / Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name; // or user.name remains the same
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin; // logical or || doesn't work with boolean values as it does above with other data

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

// req.body - access the data that is sent in the body - e.g. data submitted in forms
// when we set a form in the frontend and we submit it, we are going to send a req, and we are going to send data in the body
// must add body parser middleware in server.js in order for req.body to work - app.use(express.json())

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

export { authUser };

// req.body - access the data that is sent in the body - e.g. data submitted in forms
// when we set a form in the frontend and we submit it, we are going to send a req, and we are going to send data in the body
// must add body parser middleware in server.js in order for req.body to work - app.use(express.json())

// Validate the token
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// middleware functions require (req, res, next) as arguments
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      console.log(decoded);
      // .select('-password') so the password is not returned from the database
      // we will now have access to req.user in all of our protected routes
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
    console.log(`Token found: ${token}`);
  } else if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  } else {
    res.status(401);
    throw new Error('Not authorized, improperly formatted token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); // 401 not authorized
    throw new Error('Not authorized as an admin');
  }
};

export { protect, isAdmin };

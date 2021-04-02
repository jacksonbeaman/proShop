import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);

// we are only going to have POST req to this route
router.post('/login', authUser);

// to implement middleware we add it as a first argument
router.route('/profile').get(protect, getUserProfile);

export default router;

import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

// we are only going to have POST req to this route
router.post('/login', authUser);

// to implement middleware we add it as a first argument
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id').delete(protect, isAdmin, deleteUser);

export default router;

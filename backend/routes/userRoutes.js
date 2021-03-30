import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController.js';

// we are only going to have POST req to this route
router.post('/login', authUser);

export default router;

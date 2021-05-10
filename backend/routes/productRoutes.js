import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';

// router.get('/', getProducts); // also works
router.route('/').get(getProducts);

// router.get('/:id', getProductById);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

export default router;

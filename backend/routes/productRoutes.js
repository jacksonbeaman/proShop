import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

// router.get('/', getProducts); // also works
router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.get('/top', getTopProducts);

// router.get('/:id', getProductById);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;

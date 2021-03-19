import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';
// error handler so we don't need a trycatch in all of our database calls in all of our routes
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public - no token necessary - i.e. you don't need to be logged in
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); // passing in an empty object to the find method from mongoose gives us everything
    res.json(products); // res.send or res.json will convert products to the JSON content type
  })
);

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;

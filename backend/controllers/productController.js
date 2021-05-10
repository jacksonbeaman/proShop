import asyncHandler from 'express-async-handler'; // error handler so we don't need a trycatch in all of our database calls in all of our routes
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public - no token necessary - i.e. you don't need to be logged in
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // passing in an empty object to the find method from mongoose gives us everything
  res.json(products); // res.send or res.json will convert products to the JSON content type
});

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, deleteProduct };

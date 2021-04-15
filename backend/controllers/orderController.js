import asyncHandler from 'express-async-handler'; // error handler so we don't need a trycatch in all of our database calls in all of our routes
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private / protected
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order itmes');
    return;
  } else {
    // we want to create a new order in the database
    // instantiate a new order - but not save it in the database yet
    const order = new Order({
      orderItems,
      user: req.user._id, // we want to attach the logged in user - we will get user id from the token - becuase this is a protected route
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // save order in database
    const createdOrder = await order.save();

    // 201 because something was created
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };

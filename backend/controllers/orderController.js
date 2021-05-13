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

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private / protected
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  // req.params.id - get ID from URL
  // .populate - mongoose method - like JOIN in SQL
  // .populate('user', 'name email'); - populate from the user table with name and email
  // first argument is the table / collection we want to reference
  // second argument is space-separated fields that we want returned / joined
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private / protected
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // set properties in order object
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // paymentResult comes from PayPal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // save order in database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // set properties in order object
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // save order in database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private / protected
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private / Admin
const getOrders = asyncHandler(async (req, res) => {
  // .populate in MongoDB is like JOIN in SQL
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

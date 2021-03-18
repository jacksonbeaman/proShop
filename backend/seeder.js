import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import Product from './models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany(); //deleteMany method returns a promise, so we must add await
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); // add users to the User table, but also store it in a variable for later use

    const adminUsers = createdUsers.filter((user) => user.isAdmin === true); // find admin users among users

    const index = Math.floor(Math.random() * Math.floor(adminUsers.length)); // select random admin user

    const adminUserId = adminUsers[index]._id;

    // add user key and random admin user id value to product data
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    // add products data to product table / collection
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); //deleteMany method returns a promise, so we must add await
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

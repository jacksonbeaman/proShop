// entry point for the server
import path from 'path';
import express from 'express'; // const express = require('express'); // common JS syntax using "require"; "import ... from ..."" is ES modules
import dotenv from 'dotenv'; // const dotenv = require('dotenv'); - common JS syntax
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
// must add file extension - e.g. .js - when using ES modules syntax for bringing in files, not packages
// const connectDB = require('./config/db'); - common JS syntax
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express(); // initialize express in variable called app

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // allow us to accept JSON data in the body - aka body parser

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// if we get a GET request to this route, we will respond with the paypal client ID from our environment
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// make uploads folder static so it can get loaded in the browser
// uploads folder is not accessible by default
const __dirname = path.resolve(); // allows __dirname to work with ES modules, as it normally does with common js - the require syntax
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // set frontend/build to a static folder if we're in production mode
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that's not our api
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    // if we get a GET request to '/', we run a function that takes in a req and res object...
    res.send('API is running...'); // ...we take res object and call send, sending a string to the client
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// // generic middleware
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next(); // you always have to call next() to move to the next piece of middleware
// });

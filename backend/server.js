// entry point for the server
import express from 'express'; // const express = require('express'); // common JS syntax using "require"; "import ... from ..."" is ES modules
import dotenv from 'dotenv'; // const dotenv = require('dotenv'); - common JS syntax
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
// must add file extension - e.g. .js - when using ES modules syntax for bringing in files, not packages
// const connectDB = require('./config/db'); - common JS syntax
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express(); // initialize express in variable called app

app.get('/', (req, res) => {
  // if we get a GET request to '/', we run a function that takes in a req and res object...
  res.send('API is running...'); // ...we take res object and call send, sending a string to the client
});

app.use('/api/products', productRoutes);

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

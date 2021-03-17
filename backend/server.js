// entry point for the server
import express from 'express'; // const express = require('express'); // common JS syntax using "require"; "import ... from ..."" is ES modules
import dotenv from 'dotenv'; // const dotenv = require('dotenv'); - common JS syntax
import colors from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js'; // must add file extension - e.g. .js - when using ES modules syntax for bringing in files, not packages
// const products = require('./data/products'); - common JS syntax
// products is a JS array of Objects, not actual JSON

dotenv.config();

connectDB();

const app = express(); // initialize express in variable called app

app.get('/', (req, res) => {
  // if we get a GET request to '/', we run a function that takes in a req and res object...
  res.send('API is running...'); // ...we take res object and call send, sending a string to the client
});

app.get('/api/products', (req, res) => {
  res.json(products); // res.send or res.json will convert products to the JSON content type
});

// route to get a single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// entry point for the server
const express = require('express'); // common JS syntax using "require"; "import ... from ..."" is ES modules
const products = require('./data/products'); // a JS array of Objects, not actual JSON

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

app.listen(5000, console.log('Server running on port 5000'));

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error middleware - if you want to overwrite the default error handler, err must be the first argument
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 500 = some server error
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

// // generic middleware
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next(); // you always have to call next() to move to the next piece of middleware
// });

const express = require('express');

const cors = require('cors');
const { bodyParser } = require('./middlewares/body-parser');
const { CustomError } = require('./middlewares/error-handler');
const app = express();
// CORS
const corsOptions = {
  origin: ['http://localhost:5173'], // Frontend URL
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
const allV1Routes = require('./routes/index');
app.use('/api/v1/', allV1Routes);

// no routes found this route will call at last
app.get('*', function (req, res) {
  res.status(404).json({ status: false, message: 'Invalid api call' });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  // Custom error handling logic
  if (err instanceof CustomError) {
    res.status(err.errorCode).json({ errors: err.message });
  } else {
    // Handle other types of errors
    res
      .status(err.statusCode || 500)
      .json({ errors: err.message ? err.message : 'Something went wrong' });
  }
});
module.exports = app;

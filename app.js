const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelize = require('./config/database');
const { ValidationError } = require('express-validation');

const app = express();

sequelize.authenticate({
  logging: false
})
  .then(() => {
    console.log('Database connected !!!');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

// Don't use for production level application
// sequelize.sync({ force: true, logging: false });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', require('./routes/index'));

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const message =
      (Array.isArray(err?.details?.params) && err.details.params[0]?.message) ||
      (Array.isArray(err?.details?.query) && err.details.query[0]?.message) ||
      (Array.isArray(err?.details?.body) && err.details.body[0]?.message) ||
      "Validation error occurred";
    return res.status(422).json({ message });
  }
  return res.status(500).json(err);
});

module.exports = app;

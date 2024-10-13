const { Joi } = require('express-validation');

exports.addToCartValidation = {
  body: Joi.object({
    bookId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
};

exports.removeFromCartValidation = {
  params: Joi.object({
    cartId: Joi.number().integer().required(),
  }),
  body: Joi.object({
    bookId: Joi.number().integer().required(),
  }),
};

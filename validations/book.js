const { Joi } = require('express-validation');

exports.getBookValidation = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};

exports.getBooksValidation = {
  query: Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).optional().default(10),
  }),
};

exports.addBookValidation = {
  body: Joi.object({
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(255).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().optional(),
  }),
};
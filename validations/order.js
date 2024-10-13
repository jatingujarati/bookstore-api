const { Joi } = require('express-validation');

exports.getOrderValidation = {
  params: Joi.object({
    orderId: Joi.number().integer().required(),
  }),
};

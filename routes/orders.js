const express = require('express');
const { validate } = require('express-validation');
const auth = require('../middlewares/auth');
const { placeOrder, getOrders, getOrderHistory } = require('../controllers/order');
const { getOrderValidation } = require('../validations/order');

const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/', auth, getOrderHistory);
router.get('/:orderId', auth, validate(getOrderValidation), getOrders);

module.exports = router;

const express = require('express');
const { validate } = require('express-validation');
const auth = require('../middlewares/auth');
const { addToCart, getCart, removeFromCart } = require('../controllers/cart');
const { addToCartValidation, removeFromCartValidation } = require('../validations/cart');

const router = express.Router();

router.get('/', auth, getCart);
router.post('/', auth, validate(addToCartValidation), addToCart);
router.delete('/:cartId', auth, validate(removeFromCartValidation), removeFromCart);

module.exports = router;

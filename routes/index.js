const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/books', require('./books'));
router.use('/cart', require('./cart'));
router.use('/orders', require('./orders'));

module.exports = router;

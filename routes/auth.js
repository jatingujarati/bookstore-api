const express = require('express');
const { validate } = require('express-validation');
const { register, login } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validations/auth');

const router = express.Router();

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

module.exports = router;
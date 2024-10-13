const express = require('express');
const { validate } = require('express-validation');
const { getBooks, getBookById, addBook } = require('../controllers/book');
const { getBookValidation, getBooksValidation, addBookValidation } = require('../validations/book');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, validate(getBooksValidation), getBooks);
router.get('/:id', auth, validate(getBookValidation), getBookById);
router.post('/', auth, validate(addBookValidation), addBook);


module.exports = router;

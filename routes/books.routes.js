const express = require('express');
const controller = require('../controllers/books.controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/books', controller.addBook);
router.get('/books', controller.getAllBooks);
router.get('/books/:bookId', controller.getOneBook);
router.patch('/books/:bookId', controller.updateBook);
router.delete('/books/:bookId', controller.deleteBook);

module.exports = router;

const express = require('express');
const { createBook, getBook, updateBook, findBook, deleteBook } = require('../controllers/book.controller.js');
const verifyToken = require('../config/verifyToken.js');
const router = express.Router();

router.use(verifyToken);
router.post('/', createBook);
router.get('/', getBook);
router.get("/:id", findBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
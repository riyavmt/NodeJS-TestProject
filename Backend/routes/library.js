const path = require('path');
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/library');

router.post('/add-book',libraryController.postAddBook);
router.get('/get-books',libraryController.getAddBook)
router.get('/return-book',libraryController.returnBook);





module.exports = router;
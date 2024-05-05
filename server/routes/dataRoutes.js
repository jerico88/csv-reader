const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route for uploading CSV data
router.post('/upload', dataController.uploadData);

// Route for getting paginated data
router.get('/paginated', dataController.getPaginatedData);

// Route for searching data
router.get('/search', dataController.searchData);

module.exports = router;
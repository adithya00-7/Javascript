const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Routes
router.get('/', notesController.getNotes);
router.post('/', notesController.createNote);

module.exports = router;

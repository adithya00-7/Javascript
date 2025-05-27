const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/notesController');

// Routes
router.get('/', getNotes);            // GET /notes
router.post('/', createNote);         // POST /notes
router.put('/:id', updateNote);       // PUT /notes/:id
router.delete('/:id', deleteNote);    // DELETE /notes/:id

module.exports = router;

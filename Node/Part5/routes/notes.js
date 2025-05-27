const express = require('express');
const router = express.Router();
const controller = require('../controllers/notesController');
const validate = require('../middleware/validate');
const {
  CreateNoteSchema,
  UpdateNoteSchema,
  QueryParamsSchema
} = require('../validators/noteSchema');

router.get('/', validate(QueryParamsSchema, 'query'), controller.getNotes);
router.post('/', validate(CreateNoteSchema), controller.createNote);
router.put('/:id', validate(UpdateNoteSchema), controller.updateNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;

const store = require('../store/notesStore');

// GET /notes or /notes?search=keyword
exports.getNotes = (req, res) => {
  const { search } = req.query;
  if (search) {
    return res.json(store.filterNotesByText(search));
  }
  res.json(store.getAllNotes());
};

// POST /notes
exports.createNote = (req, res) => {
  const { text } = req.body;
  const note = store.addNote(text);
  res.status(201).json(note);
};

// PUT /notes/:id
exports.updateNote = (req, res) => {
  const updated = store.updateNote(req.params.id, req.body.text);
  if (!updated) return res.status(404).json({ error: 'Note not found' });
  res.json(updated);
};

// DELETE /notes/:id
exports.deleteNote = (req, res) => {
  const deleted = store.deleteNote(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Note not found' });
  res.status(204).end(); // No content
};

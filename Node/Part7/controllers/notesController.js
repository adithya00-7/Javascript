const store = require('../store/notesDbStore');

// GET /notes
exports.getNotes = (req, res) => {
  const { search } = req.query;

  const handler = (err, notes) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(notes);
  };

  if (search) {
    store.filterNotesByText(search, handler);
  } else {
    store.getAllNotes(handler);
  }
};

// POST /notes
exports.createNote = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  store.addNote(text, (err, newNote) => {
    if (err) return res.status(500).json({ error: 'Failed to add note' });
    res.status(201).json(newNote);
  });
};

// PUT /notes/:id
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  store.updateNote(id, text, (err, updatedNote) => {
    if (err) return res.status(500).json({ error: 'Failed to update note' });
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.json(updatedNote);
  });
};

// DELETE /notes/:id
exports.deleteNote = (req, res) => {
  const { id } = req.params;

  store.deleteNote(id, (err, success) => {
    if (err) return res.status(500).json({ error: 'Failed to delete note' });
    if (!success) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true });
  });
};

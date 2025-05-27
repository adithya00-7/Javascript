const { readNotes, writeNotes } = require('../utils/fileStore');

// GET /notes
exports.getNotes = (req, res) => {
  const notes = readNotes();
  res.json(notes);
};

// POST /notes
exports.createNote = (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now().toString(),
    text: req.body.text || ''
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
};

// PUT /notes/:id
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const notes = readNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  note.text = text;
  writeNotes(notes);
  res.json(note);
};

// DELETE /notes/:id
exports.deleteNote = (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  notes = notes.filter(n => n.id !== id);
  writeNotes(notes);
  res.status(204).end(); // 204 = No Content
};

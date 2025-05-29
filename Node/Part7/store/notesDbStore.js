const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all notes
function getAllNotes(callback) {
  db.all('SELECT * FROM notes', [], callback);
}

// Add a note
function addNote(text, callback) {
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  db.run(
    'INSERT INTO notes (id, text, createdAt) VALUES (?, ?, ?)',
    [id, text, createdAt],
    function (err) {
      if (err) return callback(err);
      callback(null, { id, text, createdAt });
    }
  );
}

// Update a note
function updateNote(id, newText, callback) {
  const updatedAt = new Date().toISOString();

  db.run(
    'UPDATE notes SET text = ?, updatedAt = ? WHERE id = ?',
    [newText, updatedAt, id],
    function (err) {
      if (err) return callback(err);
      if (this.changes === 0) return callback(null, null); // not found
      callback(null, { id, text: newText, updatedAt });
    }
  );
}

// Delete a note
function deleteNote(id, callback) {
  db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
    if (err) return callback(err);
    callback(null, this.changes > 0);
  });
}

// Filter notes by text
function filterNotesByText(keyword, callback) {
  db.all(
    'SELECT * FROM notes WHERE text LIKE ?',
    [`%${keyword}%`],
    callback
  );
}

module.exports = {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
  filterNotesByText
};

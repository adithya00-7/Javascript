const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/notes.json');

// Load all notes
function getAllNotes(callback) {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return callback(err);
    const notes = JSON.parse(data || '[]');
    callback(null, notes);
  });
}

// Save notes
function saveNotes(notes, callback) {
  fs.writeFile(dbPath, JSON.stringify(notes, null, 2), callback);
}

module.exports = {
  getAllNotes,
  saveNotes
};

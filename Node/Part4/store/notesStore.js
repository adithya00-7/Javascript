const { readNotes, writeNotes } = require('../utils/fileStore');

// In-memory array
let notes = readNotes();

// Persist to file
function persist() {
  writeNotes(notes);
}

// CRUD + Filter
function getAllNotes() {
  return notes;
}

function addNote(text) {
  const note = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString()
  };
  notes.push(note);
  persist();
  return note;
}

function updateNote(id, newText) {
  const note = notes.find(n => n.id === id);
  if (!note) return null;
  note.text = newText;
  note.updatedAt = new Date().toISOString();
  persist();
  return note;
}

function deleteNote(id) {
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return false;
  notes.splice(index, 1);
  persist();
  return true;
}

function filterNotesByText(keyword) {
  return notes.filter(n => n.text.includes(keyword));
}

// Auto-save every 30s
setInterval(() => {
  console.log('🕒 Auto-saving notes...');
  persist();
}, 30000);

module.exports = {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
  filterNotesByText
};

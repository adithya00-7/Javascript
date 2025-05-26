const fs = require('fs');
const filePath = './notes.json';

function loadNotes() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return []; // return empty array if file doesn't exist or is empty
  }
}

function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

function addNote(text) {
  const notes = loadNotes();
  const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  const newNote = { id: newId, text };
  notes.push(newNote);
  saveNotes(notes);
  console.log("✅ Note added:", newNote);
}

function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("📭 No notes found.");
  } else {
    console.log("📋 Your Notes:");
    notes.forEach(note => {
      console.log(`${note.id}: ${note.text}`);
    });
  }
}

function removeNote(id) {
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  if (notes.length === filteredNotes.length) {
    console.log(`❌ No note found with ID: ${id}`);
  } else {
    saveNotes(filteredNotes);
    console.log(`🗑 Note with ID ${id} removed.`);
  }
}

function editNote(id, newText) {
  const notes = loadNotes();
  let found = false;
  const updatedNotes = notes.map(note => {
    if (note.id === id) {
      found = true;
      return { ...note, text: newText };
    }
    return note;
  });

  if (found) {
    saveNotes(updatedNotes);
    console.log(`✏️ Note with ID ${id} updated.`);
  } else {
    console.log(`❌ No note found with ID: ${id}`);
  }
}

// =============================
// CLI COMMAND HANDLING
// =============================
const command = process.argv[2];

switch (command) {
  case 'add':
    const text = process.argv[3];
    if (!text) {
      console.log("⚠️ Please provide note text.");
    } else {
      addNote(text);
    }
    break;

  case 'list':
    listNotes();
    break;

  case 'remove':
    const removeId = parseInt(process.argv[3]);
    if (isNaN(removeId)) {
      console.log("⚠️ Please provide a valid note ID to remove.");
    } else {
      removeNote(removeId);
    }
    break;

  case 'edit':
    const editId = parseInt(process.argv[3]);
    const newText = process.argv[4];
    if (isNaN(editId) || !newText) {
      console.log("⚠️ Please provide a valid ID and new text.");
    } else {
      editNote(editId, newText);
    }
    break;
}

module.exports={
  loadNotes,
  addNote,
  removeNote,
  editNote
}

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/notes.json');

function readNotes() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data || '[]');
}

function writeNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

module.exports = { readNotes, writeNotes };

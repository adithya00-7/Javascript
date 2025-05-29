const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/connect to the database file
const db = new sqlite3.Database(path.join(__dirname, '../data/notes.db'));

// Create the notes table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT
    )
  `);
});

module.exports = db;

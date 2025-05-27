const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');

// Middleware to parse JSON
app.use(express.json());

// Route for all notes API
app.use('/notes', notesRouter);

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});

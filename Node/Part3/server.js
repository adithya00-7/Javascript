const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');

// Middleware to parse JSON
app.use(express.json());

// All routes starting with /adithya go to notesRouter
app.use('/adithya', notesRouter);

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

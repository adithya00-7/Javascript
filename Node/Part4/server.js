const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');

// Middleware
app.use(express.json());

// Mount routes
app.use('/dinosaur', notesRouter);

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});

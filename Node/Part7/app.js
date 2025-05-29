const express = require('express');
const app = express();
const notesRoutes = require('./routes/notes');

app.use(express.json());
app.use('/notes', notesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

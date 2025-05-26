const express = require('express');
const app = express();

// Middleware to parse JSON from the body
app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
const { loadNotes,
  addNote,
  removeNote,
  editNote}=require('./notes');


app.get('/notes', (req, res) => {

  let adithya=loadNotes();
  return res.json(adithya);
});

app.post('/notes', (req, res) => {
  const {text}= req.body;
  addNote(text);
  res.send('New note added');
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'New text is required' });
  }

  const updated = editNote(id, text); // Modify editNote to return the updated note or null
  

  res.json(updated);
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const upd=removeNote(id);
  res.json(upd);
});

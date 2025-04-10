const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Note = require('./models/Note');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/api/status', (req, res) => {
    res.json({ status: 'Backend is working fine!' });
});

app.post('/api/note', async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.json(newNote);
});

app.get('/api/note', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});

const Note = require('../../models/Note');

module.exports = {
  create,
  getAll,
  delete: deleteNote,
};

// Create a new note
async function create(req, res) {
  try {
    // Check if req.user is set
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    // Validate request body
    if (!req.body.content || req.body.content.trim() === '') {
      return res.status(400).json({ error: 'Note content cannot be empty' });
    }

    console.log('Request body:', req.body); // Debugging
    console.log('User ID:', req.user._id); // Check user authentication

    const note = await Note.create({
      content: req.body.content.trim(), // Remove extra spaces
      user: req.user._id, // Associate with logged-in user
    });

    res.status(201).json(note); // Respond with the newly created note
  } catch (err) {
    console.error('Error creating note:', err); // Log full error
    res
      .status(500)
      .json({ error: 'Failed to create note', details: err.message });
  }
}

// Get all notes for the logged-in user
async function getAll(req, res) {
  try {
    // Check if req.user is set
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    const notes = await Note.find({ user: req.user._id }); // Find notes for the logged-in user
    res.json(notes); // Respond with notes
  } catch (err) {
    console.error('Error fetching notes:', err); // Log full error
    res
      .status(500)
      .json({ error: 'Failed to fetch notes', details: err.message });
  }
}

// Delete a specific note
async function deleteNote(req, res) {
  try {
    // Check if req.user is set
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    // Validate note ID
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted', note: deletedNote });
  } catch (err) {
    console.error('Error deleting note:', err); // Log full error
    res
      .status(500)
      .json({ error: 'Failed to delete note', details: err.message });
  }
}

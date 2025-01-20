const Note = require('../../models/note');

module.exports = {
  create,
  getAll,
  delete: deleteNote,
  update,
};

// Create a new note
async function create(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    const { content, category } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content cannot be empty' });
    }

    const note = await Note.create({
      content: content.trim(),
      category: category || 'General',
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err);
    res
      .status(500)
      .json({ error: 'Failed to create note', details: err.message });
  }
}

// Get all notes for the logged-in user
async function getAll(req, res) {
  try {
    // Check if req.user is set (ensure user is authenticated)
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    // Retrieve all notes for the logged-in user
    const notes = await Note.find({ user: req.user._id });

    // Respond with the found notes
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err); // Log the error
    res
      .status(500)
      .json({ error: 'Failed to fetch notes', details: err.message });
  }
}

// Delete a specific note
async function deleteNote(req, res) {
  try {
    console.log('Request Params:', req.params);
    console.log('Authenticated User:', req.user);

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.user._id, // Ensure user owns the note
    });

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted', note: deletedNote });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
}

// Update a specific note
async function update(req, res) {
  try {
    const { id } = req.params; // Extract the note ID from the URL
    const { content, category } = req.body; // Get updated data from the request body

    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User not logged in' });
    }

    // Ensure the note content is not empty
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content cannot be empty' });
    }

    // Find and update the note
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user._id }, // Match the note by ID and ownership
      { content: content.trim(), category }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(updatedNote); // Send the updated note as the response
  } catch (err) {
    console.error('Error updating note:', err);
    res
      .status(500)
      .json({ error: 'Failed to update note', details: err.message });
  }
}

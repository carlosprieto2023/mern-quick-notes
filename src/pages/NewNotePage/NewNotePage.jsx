import { useState } from 'react';
import { createNote } from '../../utilities/notes-api'; // Use helper function

export default function NewNotePage() {
  const [note, setNote] = useState('');

  async function handleAddNote() {
    try {
      const newNote = await createNote(note); // Use createNote API function
      console.log('Note added:', newNote);
      setNote(''); // Clear input field after successful addition
    } catch (error) {
      console.error('Failed to add note:', error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (note.trim() === '') return; // Prevent submitting empty notes
    handleAddNote();
  }

  return (
    <div className="note-form">
      <h2>Create New Note</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)} // Update state
          />
          <br />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
}

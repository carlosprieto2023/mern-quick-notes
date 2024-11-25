import { useEffect, useState } from 'react';
import {
  createNote,
  deleteNoteById,
  getAllNotes,
} from '../../utilities/notes-api';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getAllNotes();
      setNotes(fetchedNotes);
    }
    fetchNotes();
  }, []);

  async function handleAddNote(newContent) {
    const newNote = await createNote(newContent);
    setNotes([...notes, newNote]);
  }

  async function handleDelete(id) {
    await deleteNoteById(id);
    setNotes(notes.filter((note) => note._id !== id));
  }

  return (
    <div className="notes-container">
      {notes.length ? (
        <div className="note-card">
          {notes.map((note) => (
            <div key={note._id} className="actions">
              <span className="note-content">{note.content}</span>
              <div className="button-group">
                <button
                  className="edit"
                  onClick={() =>
                    alert('Edit functionality not yet implemented')
                  }
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No notes yet!</p>
      )}
      <button
        className="add-note-button"
        onClick={() => handleAddNote(prompt('Enter note content'))}
      >
        Add Note
      </button>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  deleteNoteById,
  getAllNotes,
  updateNoteById,
} from '../../../utilities/notes-api';
import EditNoteModal from '../Modal/EditNoteModal';
import './NoteList.css';

export default function NoteList({
  notes = [],
  setNotes,
  currentCategory,
  categories,
  preferences,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getAllNotes();
        const standardizedNotes = fetchedNotes.map((note) => ({
          id: note._id,
          category: note.category || 'Uncategorized',
          content: note.content || '',
          originalCategory:
            note.originalCategory || note.category || 'Uncategorized',
        }));
        setNotes(standardizedNotes || []);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };

    fetchNotes();
  }, [setNotes]);

  // Handle note actions: delete, recover, and permanent delete
  const handleNoteAction = async (noteId, action) => {
    if (!noteId) return console.error('Note ID is undefined!');
    try {
      const noteToUpdate = notes.find((note) => note.id === noteId);
      if (!noteToUpdate) return;

      let updatedNote;
      switch (action) {
        case 'delete':
          updatedNote = {
            ...noteToUpdate,
            category: 'Deleted',
            originalCategory:
              noteToUpdate.originalCategory || noteToUpdate.category, // Preserve the original category before deleting
          };
          break;
        case 'recover':
          // Recover the note to its original category
          updatedNote = {
            ...noteToUpdate,
            category: noteToUpdate.originalCategory || 'Uncategorized', // Recover category from originalCategory
          };
          break;
        case 'permanentDelete':
          await deleteNoteById(noteId);
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== noteId)
          );
          return;
        default:
          return;
      }

      await updateNoteById(noteId, updatedNote);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
      );
    } catch (err) {
      console.error(`Failed to ${action} note:`, err);
    }
  };

  // Handle Category Change
  const handleCategoryChange = async (event, noteId) => {
    const newCategory = event.target.value;
    const noteToUpdate = notes.find((note) => note.id === noteId);

    if (!noteToUpdate) {
      console.error('Note not found!');
      return;
    }

    const updatedNote = {
      ...noteToUpdate,
      category: newCategory,
      // Preserve originalCategory if it exists
      originalCategory: noteToUpdate.originalCategory || noteToUpdate.category,
    };

    try {
      // Update note on the backend
      await updateNoteById(noteId, updatedNote);

      // Update the global notes state
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
      );
    } catch (err) {
      console.error('Failed to update category:', err);
    }
  };

  // Filter Notes by Category
  const filteredNotes = notes.filter((note) =>
    currentCategory === 'All'
      ? note.category !== 'Deleted'
      : currentCategory === 'Deleted'
      ? note.category === 'Deleted'
      : note.category === currentCategory
  );

  return (
    <div>
      <div
        className={`notes-container ${preferences.darkMode ? 'dark-mode' : ''}`}
      >
        {filteredNotes.length ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <p>
                <strong>Category:</strong> {note.category}
              </p>
              <p>{note.content}</p>
              <div className="button-container">
                {note.category !== 'Deleted' && (
                  <button
                    className="edit-button"
                    onClick={() => {
                      setNoteToEdit({ ...note });
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
                {/* Recover Button */}
                {note.category === 'Deleted' && (
                  <button
                    className="recover-button"
                    onClick={() => handleNoteAction(note.id, 'recover')}
                  >
                    Recover
                  </button>
                )}
                {/* Delete Permanently Button */}
                <button
                  className="delete-button"
                  onClick={() =>
                    handleNoteAction(
                      note.id,
                      note.category === 'Deleted' ? 'permanentDelete' : 'delete'
                    )
                  }
                >
                  {note.category === 'Deleted' ? 'Permanent Delete' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes available in this category.</p>
        )}
      </div>
      {/* Modal for editing notes */}
      {isModalOpen && noteToEdit && (
        <EditNoteModal
          note={noteToEdit}
          setNote={setNoteToEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSaveNote={(updatedNote) => {
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
              )
            );
            setIsModalOpen(false); // Close the modal after saving
          }}
          handleCategoryChange={handleCategoryChange}
          preferences={preferences}
        />
      )}
    </div>
  );
}

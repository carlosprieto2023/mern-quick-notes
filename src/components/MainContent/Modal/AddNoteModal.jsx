import { createNote } from '../../../utilities/notes-api';
import './AddNoteModal.css';

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  setNotes,
  newNote,
  setNewNote,
  newCategory,
  setNewCategory,
  categories,
  preferences,
}) {
  const handleAddNote = async () => {
    if (newNote.trim() && newCategory) {
      try {
        const note = await createNote(newNote, newCategory);
        console.log('New Note:', note); // Log new note
        setNotes((prevNotes) => {
          console.log('Previous Notes:', prevNotes); // Log previous state
          return [...prevNotes, note];
        });
        setNewNote('');
        setNewCategory('');
        setIsModalOpen(false);
      } catch (err) {
        console.error('Failed to add note:', err);
        alert('Failed to add note. Please try again.');
      }
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className={`modal ${preferences.darkMode ? 'dark-mode' : ''}`}>
            <h3>Add a New Note</h3>
            <textarea
              placeholder="Type your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories
                .filter((category) => category !== 'All') // Exclude "All" from the dropdown
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleAddNote}>Add Note</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

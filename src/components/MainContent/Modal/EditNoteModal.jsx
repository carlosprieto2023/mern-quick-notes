import './EditNoteModal.css';

export default function EditNoteModal({
  note,
  setNote,
  isModalOpen,
  setIsModalOpen,
  handleSaveNote,
  handleCategoryChange,
  preferences,
}) {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal ${preferences.darkMode ? 'dark-mode' : ''}`}>
        <h2>Edit Note</h2>
        <div>
          <strong>Category:</strong>
          <select
            id="category-select"
            value={note.category}
            onChange={(e) => {
              const newCategory = e.target.value;
              setNote({ ...note, category: newCategory }); // Update local state
              handleCategoryChange(e, note.id); // Call parent function to update global state
            }}
          >
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
            <option value="To-Do">To-Do</option>
            <option value="Important">Important</option>
            <option value="Meetings">Meetings</option>
            <option value="Archive">Archive</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>
        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          maxLength="200"
          className="note-textarea"
        />
        <div className="modal-buttons">
          <button
            onClick={() => {
              handleSaveNote({
                ...note,
                category: note.category, // Ensure the correct category is passed
              });
            }}
          >
            Save
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

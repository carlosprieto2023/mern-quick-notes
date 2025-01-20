import './AddNoteButton.css';

export default function AddNoteButton({ setIsModalOpen }) {
  return (
    <div className="add-note-container">
      <button onClick={() => setIsModalOpen(true)}>Add Note</button>
    </div>
  );
}

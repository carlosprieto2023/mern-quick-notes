import { useEffect } from 'react';
import { getAllNotes, updateNoteById } from '../../utilities/notes-api';
import AddNoteButton from '../MainContent/AddNoteButton/AddNoteButton';
import EditNoteModal from '../MainContent/Modal/EditNoteModal';
import './MainContent.css';
import AddNoteModal from './Modal/AddNoteModal';
import NoteList from './NoteList/NoteList';

export default function MainContent({
  notes,
  setNotes,
  currentCategory,
  setEditingNote,
  editingNote,
  categories,
  isModalOpen,
  setIsModalOpen,
  newNote,
  setNewNote,
  newCategory,
  setNewCategory,
  preferences,
}) {
  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getAllNotes();
        const standardizedNotes = fetchedNotes.map((note) => ({
          id: note._id,
          category: note.category || 'Uncategorized',
          content: note.content || '',
        }));
        setNotes(standardizedNotes);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };

    fetchNotes();
  }, [editingNote]); // Fetch only when editingNote changes

  // Handle Category Change
  async function handleCategoryChange(e, noteId) {
    console.log(handleCategoryChange); // Make sure this is a function
    const updatedCategory = e.target.value;
    const updatedNote = notes.find((note) => note.id === noteId);
    if (updatedNote) {
      updatedNote.category = updatedCategory;
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
      );
    }
  }

  // Handle Save Note (Define this function)
  async function handleSaveNote(note) {
    try {
      // If you're updating the note, call the update API here.
      const updatedNote = await updateNoteById(note.id, note);
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
      );
      setEditingNote(null); // Close the modal after saving
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  }

  return (
    <div className={`main-content ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <div className={`top-bar ${preferences.darkMode ? 'dark-mode' : ''}`}>
        <AddNoteButton
          className="add-note-button"
          setIsModalOpen={setIsModalOpen}
        />
        <h2>Viewing: {currentCategory || 'Uncategorized'}</h2>
      </div>
      <NoteList
        notes={notes}
        setNotes={setNotes}
        currentCategory={currentCategory}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        categories={categories}
        preferences={preferences}
      />
      {isModalOpen && (
        <AddNoteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setNotes={setNotes}
          newNote={newNote}
          setNewNote={setNewNote}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          categories={categories}
          preferences={preferences}
        />
      )}
      {/* Pass handleCategoryChange to EditNoteModal */}
      {isModalOpen && editingNote && (
        <EditNoteModal
          note={editingNote}
          setNote={setEditingNote}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSaveNote={handleSaveNote}
          handleCategoryChange={handleCategoryChange}
        />
      )}
    </div>
  );
}

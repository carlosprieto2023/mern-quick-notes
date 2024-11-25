import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewNotePage from '../NewNotePage/NewNotePage';
import NotesPage from '../NotesPage/NotesPage';
import './App.css'; // Import the CSS

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]); // Initialize as an array

  function addNote(newNote) {
    setNotes([...notes, newNote]);
  }

  function deleteNote(noteId) {
    setNotes(notes.filter((note) => note.id !== noteId));
  }

  return (
    <main className="App">
      {user ? (
        <>
          {/* Navbar */}
          <NavBar user={user} setUser={setUser} />
          <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
              <h2>My Notes</h2>
              <ul>
                <Link to="/notes">
                  <li>All Notes</li>
                </Link>
                <li>Work</li>
                <li>Personal</li>
                <li>Ideas</li>
                <li>To-Do</li>
                <li>Important</li>
                <li>Meetings</li>
                <li>Archive</li>
                <li>Deleted</li>
              </ul>
            </div>
            {/* Main Content */}
            <div className="main-content">
              <Routes>
                <Route
                  path="/notes/new"
                  element={<NewNotePage addNote={addNote} />}
                />
                <Route
                  path="/notes"
                  element={<NotesPage notes={notes} deleteNote={deleteNote} />}
                />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        // Authpage
        <AuthPage user={user} setUser={setUser} />
      )}
    </main>
  );
}

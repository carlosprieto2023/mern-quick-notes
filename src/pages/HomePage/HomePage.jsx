import { useContext, useState } from 'react';
import Header from '../../components/Header/Header';
import MainContent from '../../components/MainContent/MainContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import { PreferencesContext } from '../../contexts/PreferencesContext';
import './HomePage.css';

const categories = [
  'All',
  'Work',
  'Personal',
  'Ideas',
  'To-Do',
  'Important',
  'Meetings',
  'Archive',
  'Deleted',
];

export default function HomePage({ user, setUser }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { preferences } = useContext(PreferencesContext); // Use context to get preferences

  const homePageClass = preferences.darkMode
    ? 'home-page dark-mode'
    : 'home-page';

  return (
    <div className={homePageClass}>
      {/* Header */}
      <Header user={user} setUser={setUser} />
      {/* Main Content */}
      <div className="home-page-body">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          preferences={preferences}
        />
        {/* Main Content */}
        <MainContent
          notes={notes}
          setNotes={setNotes}
          newNote={newNote}
          setNewNote={setNewNote}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          currentCategory={currentCategory}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          categories={categories}
          preferences={preferences}
        />
      </div>
    </div>
  );
}

import { useContext } from 'react';
import { PreferencesContext } from '../../contexts/PreferencesContext';
import './Header.css';
import NavBar from './NavBar/NavBar';

export default function Header({ user, setUser }) {
  const { preferences } = useContext(PreferencesContext);

  return (
    <div className={`header ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <NavBar user={user} setUser={setUser} />
    </div>
  );
}

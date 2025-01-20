import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import HamburgerButton from './HamburgerButton';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogOut() {
    setUser(null); // Placeholder for logout logic
  }

  return (
    <div className="navbar">
      <span className="welcome-text">Welcome, {user.name}</span>
      <HamburgerButton
        isActive={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <DropdownMenu onLogOut={handleLogOut} />}
    </div>
  );
}

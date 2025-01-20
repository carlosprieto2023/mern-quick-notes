import './HamburgerButton.css';

export default function HamburgerButton({ isActive, onClick }) {
  return (
    <button
      className={`hamburger ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
    >
      {[...Array(3)].map((_, index) => (
        <span key={index} className="hamburger-line"></span>
      ))}
    </button>
  );
}

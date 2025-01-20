import './DropdownMenu.css';

export default function DropdownMenu({ onLogOut }) {
  const menuItems = [
    { label: 'Account', href: '/account' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="dropdown-menu">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="dropdown-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      ))}
      <div className="spacer"></div>
      <button className="dropdown-item" onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
}

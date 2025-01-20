import './Sidebar.css';

export default function Sidebar({
  categories,
  currentCategory,
  setCurrentCategory,
  preferences,
}) {
  return (
    <div className={`sidebar ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={currentCategory === category ? 'active' : ''}
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

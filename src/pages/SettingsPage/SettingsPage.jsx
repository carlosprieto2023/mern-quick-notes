// SettingsPage.jsx
import { useContext } from 'react';
import { PreferencesContext } from '../../contexts/PreferencesContext'; // Named import
import './SettingsPage.css';

export default function SettingsPage() {
  const { preferences, togglePreferences } = useContext(PreferencesContext);

  return (
    <div className={`settings-page ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>App Preferences</h2>
        <label>
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={() => togglePreferences('darkMode')}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}

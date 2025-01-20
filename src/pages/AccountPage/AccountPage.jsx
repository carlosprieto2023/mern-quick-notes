// AccountPage.jsx
import { useContext } from 'react';
import { PreferencesContext } from '../../contexts/PreferencesContext'; // Named import
import './AccountPage.css';

export default function AccountPage({ user }) {
  const { preferences } = useContext(PreferencesContext);
  // Format the account creation date
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`account-page ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <h1>Account Information</h1>
      <div className="account-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong>
          {user.email}
        </p>
        <p>
          <strong>Member since:</strong> {formattedDate}
        </p>
      </div>
    </div>
  );
}

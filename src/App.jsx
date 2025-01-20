import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PreferencesProvider } from './contexts/PreferencesContext';
import AccountPage from './pages/AccountPage/AccountPage';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { getUser } from './utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <PreferencesProvider>
      <div>
        {user ? (
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} setUser={setUser} />}
            />
            <Route path="/account" element={<AccountPage user={user} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </div>
    </PreferencesProvider>
  );
}

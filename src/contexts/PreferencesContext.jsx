import { createContext, useEffect, useState } from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    // Get initial darkMode preference from localStorage or default to false
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return { darkMode: savedDarkMode ?? false };
  });

  useEffect(() => {
    // Update localStorage whenever darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(preferences.darkMode));
    // Apply dark mode class to the body directly
    if (preferences.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [preferences.darkMode]);

  const togglePreferences = () => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      darkMode: !prevPreferences.darkMode,
    }));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, togglePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <button
      className={`theme-toggle-button ${darkMode ? 'dark' : 'light'}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="icon">{darkMode ? '☀️' : '🌙'}</span>
    </button>
  );
};

export default ThemeToggle;

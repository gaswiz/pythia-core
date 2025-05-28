import React, { useState, useEffect } from 'react';
import './App.css';

import MenuBar from './components/MenuBar.jsx';
import Hero from './components/Hero.jsx';
import FileUploader from './components/FileUploader.jsx';
import PredictionTool from './components/PredictionTool.jsx';
import RecommendationTool from './components/RecommendationTool.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="App">
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 999,
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>

      <MenuBar />
      <section id="hero"><Hero /></section>
      <section id="upload"><FileUploader /></section>
      <section id="predict"><PredictionTool /></section>
      <section id="recommend"><RecommendationTool /></section>
      <section id="dashboard"><Dashboard /></section>
      <section id="footer"><Footer /></section>
    </div>
  );
}

export default App;

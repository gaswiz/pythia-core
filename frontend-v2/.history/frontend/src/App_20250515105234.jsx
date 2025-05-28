// src/App.js
import React from 'react';
import './App.css';

import MenuBar from './components/MenuBar';
import Hero from './components/Hero';
import FileUploader from './components/FileUploader';
import PredictionTool from './components/PredictionTool';
import RecommendationTool from './components/RecommendationTool';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
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

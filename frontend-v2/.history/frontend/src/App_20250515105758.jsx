import React from 'react';
import './App.css';

import MenuBar from './components/MenuBar.jsx';
import Hero from './components/Hero.jsx';
import FileUploader from './components/FileUploader.jsx';
import PredictionTool from './components/PredictionTool.jsx';
import RecommendationTool from './components/RecommendationTool.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';


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

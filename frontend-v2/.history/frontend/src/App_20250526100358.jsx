import React from 'react';
import './App.css';

import MenuBar from './components/MenuBar.jsx';
import Hero from './components/Hero.jsx';
import { ThreeDMarquee } from './components/ui/3d-marquee';
import ThreeDMarqueeDemo from './components/ui/ThreeDMarqueeDemo';
import FileUploader from './components/FileUploader.jsx';
// import PredictionTool from './components/PredictionTool.jsx';
// import RecommendationTool from './components/RecommendationTool.jsx';
// import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Faq from './components/Faq.jsx';
import DashboardSelector from './components/DashboardSelector.jsx';

function App() {
  return (
    <div className="App">
      <ThemeToggle />
      <MenuBar />

      <section id="hero"><Hero /></section>
      <ThreeDMarqueeDemo />

      <section id="upload"><FileUploader /></section>
      <section id="dashboard"><DashboardSelector /></section>
      {/* <section id="predict"><PredictionTool /></section>
      <section id="recommend"><RecommendationTool /></section>
      <section id="dashboard"><Dashboard /></section> */}
      <section id="faq"><Faq /></section>
      <section id="footer"><Footer /></section>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import MenuBar from './components/MenuBar.jsx';
import Hero from './components/Hero.jsx';
import { ThreeDMarquee } from './components/ThreeDMarquee.jsx'; // ✅ updated import
import FileUploader from './components/FileUploader.jsx';
import PredictionTool from './components/PredictionTool.jsx';
import RecommendationTool from './components/RecommendationTool.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Faq from './components/Faq.jsx';

function App() {
  return (
    <div className="App">
      <ThemeToggle />
      <MenuBar />
      
      <section id="hero"><Hero /></section>

      {/* ✅ Inserted 3D Marquee component here */}
      <section id="marquee">
        <ThreeDMarquee
          images={[
            '/images/image1.png',
            '/images/image2.png',
            '/images/image3.png',
            '/images/image4.png',
            '/images/image5.png',
            '/images/image6.png',
          ]}
        />
      </section>

      <section id="upload"><FileUploader /></section>
      <section id="predict"><PredictionTool /></section>
      <section id="recommend"><RecommendationTool /></section>
      <section id="dashboard"><Dashboard /></section>
      <section id="faq"><Faq /></section>
      <section id="footer"><Footer /></section>
    </div>
  );
}

export default App;

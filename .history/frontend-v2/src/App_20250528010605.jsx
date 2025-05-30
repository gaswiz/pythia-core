/*
  File: /src/App.jsx
  Description: Integrating HeroSectionOne into app layout
*/

import React from 'react';
import HeroSectionOne from './components/ui/hero-section-demo-1';
import Features from './components/Features';
import Simulation from './components/Simulation';
import About from './components/About';

export default function App() {
  return (
    <main className="bg-white text-gray-800 font-sans">
      <HeroSectionOne />
      <section id="features">
        <Features />
      </section>
      <section id="simulation">
        <Simulation />
      </section>
      <section id="about">
        <About />
      </section>
      <footer className="text-center text-xs text-gray-400 py-8">
        &copy; 2025 Konstantinos Panagiotaropoulos — University of East London
      </footer>
    </main>
  );
}

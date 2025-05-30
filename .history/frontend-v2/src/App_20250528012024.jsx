/*
  File: /src/App.jsx
  Description: Main entry point calling all component panes for P.Y.T.H.I.A.
*/

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Simulation from './components/Simulation';
import About from './components/About';

export default function App() {
  return (
    <main className="bg-white text-gray-800 font-sans">
      <Navbar />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <Simulation />
      <section id="about">
        <About />
      </section>
      <footer className="text-center text-xs text-gray-400 py-8">
        &copy; 2025 Konstantinos Panagiotaropoulos — University of East London
      </footer>
    </main>
  );
}

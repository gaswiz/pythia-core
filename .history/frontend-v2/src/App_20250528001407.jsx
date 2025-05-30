import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Simulation from './components/Simulation';
import About from './components/About';

export default function App() {
  return (
    <main className="bg-white text-gray-800 font-sans">
      <Hero />
      <Features />
      <Simulation />
      <About />
      <footer className="text-center text-xs text-gray-400 py-8">
        &copy; 2025 Konstantinos Panagiotaropoulos — University of East London
      </footer>
    </main>
  );
}
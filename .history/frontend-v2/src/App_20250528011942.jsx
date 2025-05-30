/*
  File: /src/App.jsx
  Description: Full simulation layout with black, white, and purple theme. Includes charts.
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";


function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />

      {/* Simulation Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-400">
          Run Your Campaign Simulation
        </h2>
        <div className="border border-white bg-black p-6 shadow-md">
          <Simulation />
        </div>
      </section>
    </div>
  );
}

export default App;
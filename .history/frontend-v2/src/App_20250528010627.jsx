/*
  File: /src/App.jsx
  Description: Updated root layout without GlowingEffect. We'll apply Hero-style animations to charts/panes.
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />

      {/* Example of a chart pane styled like Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Live Campaign Forecast</h2>
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-md">
          {/* Future: Add motion.div around chart or graph */}
          <p className="text-center text-neutral-400">[Chart goes here]</p>
        </div>
      </section>

      <Simulation />
    </div>
  );
}

export default App;

/*
  File: /src/App.jsx
  Description: Updated root layout. Hero-style simulation UI with sharper borders and unified logo selection.
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />

      {/* Simulation Section with unified icon and sharper borders */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Run Your Campaign Simulation</h2>
        <div className="border border-white bg-neutral-900 p-6 shadow-md">
          <Simulation />
        </div>
      </section>
    </div>
  );
}

export default App;

/*
  File: /src/App.jsx
  Description: Updated root layout. Hero-style simulation UI with animated logo selection.
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />

      {/* Simulation Section Styled Like Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Run Your Campaign Simulation</h2>
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-md">
          {/* Platform logo selection with hover animation */}
          <div className="flex justify-center gap-6 mb-8">
            {["meta.png", "google.png"].map((logo, index) => (
              <div
                key={index}
                className="transition-all duration-300 ease-in-out rounded-full p-4 hover:bg-neutral-800 cursor-pointer"
              >
                <img
                  src={`/${logo}`}
                  alt={logo.split(".")[0]}
                  className="w-16 h-16 object-contain rounded-full"
                />
              </div>
            ))}
          </div>
          <Simulation />
        </div>
      </section>
    </div>
  );
}

export default App;

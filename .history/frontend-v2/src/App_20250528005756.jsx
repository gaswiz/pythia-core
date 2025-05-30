/*
  File: /src/App.jsx
  Description: Root component to display the Hero section at top with black background
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";
import GlowingEffectDemo from "./components/ui/glowing-effect";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <GlowingEffectDemo />
      </div>
      <Simulation />
    </div>
  );
}

export default App;
// File: src/App.jsx

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />
      <Simulation />
    </div>
  );
}

export default App;

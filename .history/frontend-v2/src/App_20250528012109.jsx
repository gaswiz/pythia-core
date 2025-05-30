import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <HeroSectionOne />
      <Simulation />
    </div>
  );
}
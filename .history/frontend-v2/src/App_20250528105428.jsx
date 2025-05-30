import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";
import ScatterDataset from "./components/ScatterDataset";
import FileUploadDemo from "./components/ui/FileUploadDemo"; // ✅ Make sure file is named correctly and capitalized

function App() {
  return (
    <div className="min-h-screen bg-black text-white space-y-16">
      <HeroSectionOne />
      <FileUploadDemo />
      <Simulation />
      <ScatterDataset />
    </div>
  );
}

export default App;

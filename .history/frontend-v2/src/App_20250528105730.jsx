import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import Simulation from "./components/Simulation";
import ScatterDataset from "./components/ScatterDataset";
import FileUploadDemo from "./components/ui/file-upload-demo"; // πρόσθεσε αυτό

function App() {
  return (
    <div className="min-h-screen bg-black text-white space-y-16">
      <HeroSectionOne />
      <FileUploadDemo /> {/* προσθέτεις το upload demo component */}
      <Simulation />
      <ScatterDataset />
    </div>
  );
}

export default App;

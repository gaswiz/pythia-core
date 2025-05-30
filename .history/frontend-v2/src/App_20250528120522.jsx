import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import FileUploadDemo from "./components/ui/file-upload-demo";
import CampaignSimulationForm from "./components/ui/CampaignSimulationForm";
import Simulation from "./components/Simulation";
import ScatterDataset from "./components/ScatterDataset";

function App() {
  return (
    <div className="min-h-screen bg-black text-white space-y-16">
      <HeroSectionOne />
      <FileUploadDemo />
      <CampaignSimulationForm /> {/* new UI form */}
      <Simulation /> keep this for fallback or backend connection
      <ScatterDataset />
    </div>
  );
}

export default App;

}

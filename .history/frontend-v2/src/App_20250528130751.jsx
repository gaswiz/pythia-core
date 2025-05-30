import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
import FileUploadDemo from "./components/ui/file-upload-demo";
import CampaignSimulationForm from "./components/ui/CampaignSimulationForm";
import Footer from "@/components/ui/Footer";
import GoogleLookerModal from "@/components/ui/GoogleLookerModal";

function App() {
  return (
    <div className="min-h-screen bg-black text-white space-y-16">
      <HeroSectionOne />
      <FileUploadDemo />
      <CampaignSimulationForm /> {/* new UI form */}
       <Footer />
    </div>
  );
}

export default App;


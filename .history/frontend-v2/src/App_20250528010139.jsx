import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";
// import GlowingEffectDemo from "./components/ui/glowing-effect-demo";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSectionOne />
      {/* <div className="max-w-7xl mx-auto px-6 py-12">
        <GlowingEffectDemo />
      </div> */}
      <h2 className="text-center text-xl mt-10">Test without GlowingEffectDemo ✅</h2>
    </div>
  );
}

export default App;

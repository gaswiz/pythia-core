/*
  File: /src/App.jsx
  Description: Root component to display the Hero section at top with black background
*/

import React from "react";
import HeroSectionOne from "./components/ui/hero-section-demo-1";

function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSectionOne />
      {/* Add more panes here */}
    </main>
  );
}

export default App;

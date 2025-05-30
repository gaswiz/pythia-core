import React, { useRef } from 'react';
import Dashboard from './Dashboard';

export default function UnifiedLandingPage() {
  const demoRef = useRef(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <header className="bg-white text-gray-800 py-6 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-purple-700">P.Y.T.H.I.A.</h1>
          <nav className="space-x-6 text-sm">
            <button onClick={scrollToDemo} className="text-purple-700 hover:underline">Try Demo</button>
            <a href="#about" className="text-gray-700 hover:underline">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-24 text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-900">Predict Your Campaign’s Success</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Use intelligent analytics and machine learning to forecast your marketing results before you spend.
        </p>
        <button
          onClick={scrollToDemo}
          className="mt-8 bg-purple-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Launch Simulator
        </button>
      </section>

      {/* Embedded Dashboard Simulation */}
      <section ref={demoRef} className="py-20 bg-white text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Campaign Simulation</h3>
        <p className="text-gray-600 mb-8">Fill in the form to preview your projected results.</p>
        <div className="max-w-2xl mx-auto">
          <Dashboard />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 text-center px-6">
        <h3 className="text-2xl font-bold text-gray-900">About the Project</h3>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          P.Y.T.H.I.A. (Predict Your Trends, Harnessing Intelligent Analytics) is a final-year thesis built to demonstrate how data-driven decision-making and predictive analytics can shape modern marketing. The system is built with React, Flask, and PostgreSQL, simulating key metrics like CTR, ROI, and conversions.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-8">
        &copy; 2025 Konstantinos Panagiotaropoulos — University of East London
      </footer>
    </div>
  );
}

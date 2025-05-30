import React from 'react';

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 shadow">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">P.Y.T.H.I.A.</h1>
          <nav className="space-x-6 text-sm">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#demo" className="hover:underline">Live Demo</a>
            <a href="#about" className="hover:underline">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20 text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-900">Predict Your Campaign’s Success</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          P.Y.T.H.I.A. uses intelligent analytics and machine learning to help you forecast the performance of your digital marketing campaigns before you even launch them.
        </p>
        <a
          href="#demo"
          className="inline-block mt-8 bg-blue-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Try Live Simulation
        </a>
      </section>

      {/* Feature Panes */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Upload Campaign Metadata</h3>
            <p className="mt-2 text-gray-600">Enter budget, duration, platform, and industry to simulate ad results before investing real money.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">View Predicted Metrics</h3>
            <p className="mt-2 text-gray-600">Visualize impressions, CTR, and conversions based on similar historical data using clean, animated charts.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Export & Integrate</h3>
            <p className="mt-2 text-gray-600">Export insights or connect your analytics dashboard with our upcoming API endpoints.</p>
          </div>
        </div>
      </section>

      {/* Embedded Demo */}
      <section id="demo" className="py-20 bg-gray-50 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Simulation</h3>
        <p className="text-gray-600 mb-8">Try out the prediction dashboard using dummy data.</p>
        <iframe
          src="/"
          title="Pythia Demo"
          className="w-full max-w-4xl h-[600px] mx-auto border rounded-xl shadow-xl"
        ></iframe>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-center px-6">
        <h3 className="text-2xl font-bold text-gray-900">About the Project</h3>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          P.Y.T.H.I.A. (Predict Your Trends, Harnessing Intelligent Analytics) is a final-year undergraduate thesis project focused on applying predictive modeling techniques to digital marketing data. Built using React, Flask, and PostgreSQL, the system showcases how machine learning can optimize campaign design and resource allocation.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-8">
        &copy; 2025 Konstantinos Panagiotaropoulos — University of East London
      </footer>
    </div>
  );
}

/*
  File: /src/components/Hero.jsx
  Description: Full-page hero section with project title and call-to-action.
*/

import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-purple-600 text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight mb-6">
        P.Y.T.H.I.A.
      </h1>
      <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
        Predict Your Trends, Harnessing Intelligent Analytics
      </p>
      <a
        href="#simulation"
        className="bg-white text-purple-700 px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition"
      >
        Try the Live Simulator
      </a>
    </section>
  );
}

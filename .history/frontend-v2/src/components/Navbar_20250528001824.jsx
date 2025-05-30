/*
  File: /src/components/Navbar.jsx
  Description: Sticky navigation bar with smooth scrolling to page sections.
*/

import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-700">P.Y.T.H.I.A.</h1>
        <div className="space-x-4 text-sm">
          <a href="#features" className="text-gray-700 hover:text-purple-700">Features</a>
          <a href="#simulation" className="text-gray-700 hover:text-purple-700">Simulator</a>
          <a href="#about" className="text-gray-700 hover:text-purple-700">About</a>
        </div>
      </div>
    </nav>
  );
}

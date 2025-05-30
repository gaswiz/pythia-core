/*
  File: /src/components/Simulation.jsx
  Description: User input form with simulated predictions for advertising campaigns.
*/

import React, { useState } from 'react';

export default function Simulation() {
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [platform, setPlatform] = useState('meta');
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyResults = {
      impressions: budget * 50,
      ctr: budget > 500 ? 2.8 : 1.1,
      conversions: budget > 500 ? 35 : 10,
    };
    setResults(dummyResults);
  };

  return (
    <section id="simulation" className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Campaign Simulator</h2>
      <p className="text-gray-600 mb-10">Fill in the details and preview estimated results.</p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget (USD)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <div className="flex justify-around">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="meta"
              checked={platform === 'meta'}
              onChange={() => setPlatform('meta')}
            />
            <span>Meta</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="google"
              checked={platform === 'google'}
              onChange={() => setPlatform('google')}
            />
            <span>Google</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Run Simulation
        </button>
      </form>

      {results && (
        <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Predicted Results</h3>
          <p><strong>Estimated Impressions:</strong> {results.impressions}</p>
          <p><strong>Click-Through Rate (CTR):</strong> {results.ctr}%</p>
          <p><strong>Expected Conversions:</strong> {results.conversions}</p>
        </div>
      )}
    </section>
  );
}
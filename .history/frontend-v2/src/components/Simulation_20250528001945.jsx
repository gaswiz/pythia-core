/*
  File: /src/components/Simulation.jsx
  Description: Updated with animated chart and Meta/Google images
*/

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  const chartData = results
    ? [
        { name: 'Impressions', value: results.impressions },
        { name: 'CTR (%)', value: results.ctr },
        { name: 'Conversions', value: results.conversions },
      ]
    : [];

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

        <div className="flex justify-around items-center mt-2">
          <label className="flex flex-col items-center">
            <input
              type="radio"
              name="platform"
              value="meta"
              checked={platform === 'meta'}
              onChange={() => setPlatform('meta')}
              className="mb-2"
            />
            <img src="/meta.png" alt="Meta" className="w-12 h-12" />
            <span className="text-sm mt-1">Meta</span>
          </label>
          <label className="flex flex-col items-center">
            <input
              type="radio"
              name="platform"
              value="google"
              checked={platform === 'google'}
              onChange={() => setPlatform('google')}
              className="mb-2"
            />
            <img src="/google.png" alt="Google" className="w-12 h-12" />
            <span className="text-sm mt-1">Google</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Run Simulation
        </button>
      </form>

      {results && (
        <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Predicted Results</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

/*
  File: /src/components/Simulation.jsx
  Description: Interactive simulation pane for P.Y.T.H.I.A.
*/

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Simulation = () => {
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [platform, setPlatform] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget);
    let data = [];
    if (budgetValue < 100) {
      data = [
        { name: "Week 1", impressions: 500, ctr: 0.5 },
        { name: "Week 2", impressions: 700, ctr: 0.4 },
      ];
    } else if (budgetValue > 500) {
      data = [
        { name: "Week 1", impressions: 3000, ctr: 1.5 },
        { name: "Week 2", impressions: 3500, ctr: 1.7 },
      ];
    } else {
      data = [
        { name: "Week 1", impressions: 1500, ctr: 1.0 },
        { name: "Week 2", impressions: 1800, ctr: 1.1 },
      ];
    }
    setResult(data);
  };

  return (
    <section id="simulation" className="bg-zinc-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">Campaign Simulation</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-zinc-800 p-6 rounded-xl shadow-lg"
        >
          <input
            type="text"
            placeholder="Company Name"
            className="rounded-lg px-4 py-2 text-black"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Budget (€)"
            className="rounded-lg px-4 py-2 text-black"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="platform"
                value="Meta"
                onChange={(e) => setPlatform(e.target.value)}
                required
              />
              <img src="/meta.png" alt="Meta" className="w-8 h-8 rounded" />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="platform"
                value="Google"
                onChange={(e) => setPlatform(e.target.value)}
              />
              <img src="/google.png" alt="Google" className="w-8 h-8 rounded" />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Run Prediction
          </button>
        </form>

        {result && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-center">Predicted Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip wrapperClassName="text-black" />
                <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default Simulation;
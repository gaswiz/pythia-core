import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [platform, setPlatform] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateChartData = () => {
    const baseImpressions = budget < 100 ? 1000 : budget > 500 ? 5000 : 3000;
    const baseCTR = budget < 100 ? 1.1 : budget > 500 ? 2.5 : 1.8;
    return [
      { name: 'Week 1', impressions: baseImpressions, ctr: baseCTR },
      { name: 'Week 2', impressions: baseImpressions + 500, ctr: baseCTR + 0.2 },
      { name: 'Week 3', impressions: baseImpressions + 800, ctr: baseCTR + 0.3 },
      { name: 'Week 4', impressions: baseImpressions + 1000, ctr: baseCTR + 0.4 },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">P.Y.T.H.I.A. Simulation</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 border rounded-xl shadow-sm"
          />
          <input
            type="number"
            placeholder="Advertising Budget ($)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-3 border rounded-xl shadow-sm"
          />
          <div className="flex justify-around">
            {['Meta', 'Google'].map((p) => (
              <label key={p} className={`cursor-pointer transition-transform duration-200 transform ${platform === p ? 'scale-110 border-blue-500 border-2' : ''} rounded-xl p-2 shadow-md`}>
                <input
                  type="radio"
                  value={p}
                  checked={platform === p}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="hidden"
                />
                <img src={`/${p.toLowerCase()}.png`} alt={p} className="w-16 h-16 object-contain" />
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!company || !budget || !platform}
          >
            Run Prediction
          </button>
        </form>

        {submitted && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Prediction Results</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-xl shadow">Impressions: {generateChartData()[3].impressions}</div>
              <div className="p-4 bg-green-50 rounded-xl shadow">CTR: {generateChartData()[3].ctr.toFixed(1)}%</div>
              <div className="p-4 bg-yellow-50 rounded-xl shadow">Conversions: {(generateChartData()[3].ctr * 10).toFixed(0)}</div>
            </div>

            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="impressions" stroke="#8884d8" />
                  <Line type="monotone" dataKey="ctr" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
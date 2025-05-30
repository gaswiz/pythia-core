/*
  File: /src/components/Simulation.jsx
  Description: Campaign simulation component with form and multiple charts (MUI).
*/

import React from "react";
import {
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@mui/x-charts";

function Simulation() {
  const sampleData = [
    { name: "Jan", clicks: 4000, conversions: 2400, amt: 2400 },
    { name: "Feb", clicks: 3000, conversions: 1398, amt: 2210 },
    { name: "Mar", clicks: 2000, conversions: 9800, amt: 2290 },
    { name: "Apr", clicks: 2780, conversions: 3908, amt: 2000 },
    { name: "May", clicks: 1890, conversions: 4800, amt: 2181 },
    { name: "Jun", clicks: 2390, conversions: 3800, amt: 2500 },
    { name: "Jul", clicks: 3490, conversions: 4300, amt: 2100 },
  ];

  return (
    <div className="space-y-10">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Campaign Name"
          className="w-full p-2 bg-black border border-white text-white"
        />
        <input
          type="number"
          placeholder="Budget"
          className="w-full p-2 bg-black border border-white text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-white text-white hover:bg-purple-700 transition"
        >
          Simulate
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-black border border-white p-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-400">Clicks Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-black border border-white p-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-400">Conversions Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversions" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Simulation;
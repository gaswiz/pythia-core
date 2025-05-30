/*
  File: /src/components/Simulation.jsx
  Description: Simulation form and chart panel with black/purple theme using MUI Charts
*/

import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';

function Simulation() {
  return (
    <div className="space-y-10">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-300">Campaign Name</label>
          <input
            type="text"
            className="mt-1 block w-full bg-neutral-900 border border-white p-2 text-white focus:outline-none"
            placeholder="Enter campaign name"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-purple-300">Budget ($)</label>
            <input
              type="number"
              className="mt-1 block w-full bg-neutral-900 border border-white p-2 text-white focus:outline-none"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-300">Duration (days)</label>
            <input
              type="number"
              className="mt-1 block w-full bg-neutral-900 border border-white p-2 text-white focus:outline-none"
              placeholder="30"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 font-semibold"
        >
          Simulate Performance
        </button>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-purple-400">Forecasted ROI Trend</h3>
        <div className="bg-neutral-900 p-4 border border-white">
          <LineChart
            xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6], label: 'Week' }]}
            series={[{ data: [0, 10, 25, 40, 60, 75, 100], label: 'ROI (%)' }]}
            width={600}
            height={300}
            colors={["#a855f7"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Simulation;
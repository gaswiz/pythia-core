/*
  File: /src/components/Simulation.jsx
  Description: Campaign simulation form with animated line chart using MUI, styled in P.Y.T.H.I.A. black/white/purple theme
*/

import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';

function Simulation() {
  return (
    <div className="space-y-10">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-purple-300">Campaign Name</label>
          <input
            type="text"
            className="bg-black border border-white text-white p-2 mt-1"
            placeholder="Enter campaign name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-purple-300">Budget ($)</label>
          <input
            type="number"
            className="bg-black border border-white text-white p-2 mt-1"
            placeholder="Enter budget"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-purple-300">Duration (days)</label>
          <input
            type="number"
            className="bg-black border border-white text-white p-2 mt-1"
            placeholder="Enter duration"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-white"
        >
          Run Simulation
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Forecast Output</h3>
        <div className="bg-white p-4">
          <LineChart
            xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
            series={[{ data: [10, 20, 40, 30, 60, 80, 90], color: '#a855f7' }]}
            width={600}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default Simulation;

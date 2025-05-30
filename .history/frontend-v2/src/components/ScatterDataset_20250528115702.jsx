"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ScatterDataset({ data }) {
  const ctrData = data.filter((d) => d.label === "Predicted CTR");
  const roiData = data.filter((d) => d.label === "Predicted ROI");

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-input">
      <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4">
        Campaign Forecast
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis type="number" dataKey="x" name="Input" unit="" tick={{ fill: '#888' }} />
          <YAxis type="number" dataKey="y" name="Prediction" unit="%" tick={{ fill: '#888' }} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ backgroundColor: "#fff", borderRadius: "0.5rem" }}
            labelStyle={{ color: "#333" }}
          />
          <Legend />
          <Scatter
            name="Predicted CTR"
            data={ctrData}
            fill="#38bdf8" // light blue
            line
            shape="circle"
          />
          <Scatter
            name="Predicted ROI"
            data={roiData}
            fill="#e0f2fe" // very light blue (almost white)
            shape="star"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

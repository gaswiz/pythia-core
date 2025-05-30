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
import GoogleLookerModal from "../../components/ui/GoogleLookerModal";

export default function ForecastReport({ data, formData }) {
  const ctrData = data.filter((d) => d.label === "Predicted CTR");
  const roiData = data.filter((d) => d.label === "Predicted ROI");

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 w-full">
      <div className="flex-1 rounded-xl bg-white dark:bg-zinc-900 shadow-input p-6 space-y-6">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
          Forecast Summary
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-300">
          <p><strong>CTR:</strong> {ctrData[0]?.y.toFixed(2)}%</p>
          <p><strong>ROI:</strong> {roiData[0]?.y.toFixed(2)}x</p>
          <p><strong>Budget:</strong> €{formData.budget}</p>
          <p><strong>Duration:</strong> {formData.duration} days</p>
          <p><strong>Industry:</strong> {formData.industry}</p>
          <p><strong>Impressions:</strong> {formData.impressions}</p>
        </div>

        <div>
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
                fill="#38bdf8"
                shape="circle"
              />
              <Scatter
                name="Predicted ROI"
                data={roiData}
                fill="#e0f2fe"
                shape="star"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full md:w-[320px] mt-10 md:mt-0">
        <GoogleLookerModal data={data} />
      </div>
    </div>
  );
}

import * as React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const dataset = [
  { version: 'v0', a1: 329, a2: 391, b1: 443, b2: 153 },
  { version: 'v1', a1: 96, a2: 139, b1: 110, b2: 217 },
  { version: 'v2', a1: 336, a2: 282, b1: 175, b2: 286 },
  { version: 'v3', a1: 159, a2: 384, b1: 195, b2: 325 },
  { version: 'v4', a1: 188, a2: 182, b1: 351, b2: 144 },
  { version: 'v5', a1: 143, a2: 360, b1: 43,  b2: 146 },
  { version: 'v6', a1: 202, a2: 209, b1: 376, b2: 309 },
  { version: 'v7', a1: 384, a2: 258, b1: 31,  b2: 236 },
  { version: 'v8', a1: 256, a2: 70,  b1: 231, b2: 440 },
  { version: 'v9', a1: 143, a2: 419, b1: 108, b2: 20 },
];

const chartSetting = {
  yAxis: [
    {
      label: 'Forecast Value',
      width: 70,
      stroke: '#fff',
      labelStyle: { fill: '#fff' },
    },
  ],
  xAxis: [
    {
      label: 'Feature Value',
      stroke: '#fff',
      labelStyle: { fill: '#fff' },
    },
  ],
  height: 400,
  margin: { top: 30, right: 30, bottom: 50, left: 80 },
};

export default function Simulation() {
  return (
    <section className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
          Campaign Simulation Forecast
        </h2>
        <div className="bg-neutral-900 border border-white p-6">
          <ScatterChart
            dataset={dataset}
            series={[
              { datasetKey: 'version', xKey: 'a1', yKey: 'a2', label: 'CTR vs Conversions' },
              { datasetKey: 'version', xKey: 'b1', yKey: 'b2', label: 'CPC vs ROI' },
            ]}
            {...chartSetting}
          />
        </div>
      </div>
    </section>
  );
}

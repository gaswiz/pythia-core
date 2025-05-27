import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { metric: 'CTR', value: 0.12 },
  { metric: 'CPC', value: 0.45 },
  { metric: 'Conversions', value: 32 },
  { metric: 'ROI', value: 2.5 },
];

const chartSetting = {
  xAxis: [
    {
      label: 'Predicted Value',
    },
  ],
  height: 400,
};

const valueFormatter = (value) => `${value}`;

export default function CampaignPerformanceChart() {
  return (
    <div className="p-6 bg-black text-white border border-white">
      <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center">
        P.Y.T.H.I.A. Forecasted Performance Metrics
      </h2>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'metric' }]}
        series={[{ dataKey: 'value', label: 'Forecasted', valueFormatter }]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      />
    </div>
  );
}

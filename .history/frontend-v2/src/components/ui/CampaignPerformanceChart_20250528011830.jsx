import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const customDataset = [
  { metric: 'CTR', pythia: 0.12 },
  { metric: 'CPC', pythia: 0.45 },
  { metric: 'Conversions', pythia: 32 },
  { metric: 'ROI', pythia: 2.5 },
];

const chartSettings = {
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
    <BarChart
      dataset={customDataset}
      yAxis={[{ scaleType: 'band', dataKey: 'metric' }]}
      series={[{ dataKey: 'pythia', label: 'P.Y.T.H.I.A. Forecast', valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSettings}
    />
  );
}

import React from 'react';

const DashboardSelectorResults = ({ data }) => {
  if (!data) return null;

  const resultItems = [
    { label: 'Predicted Clicks', value: data.clicks, icon: '🖱️' },
    { label: 'Predicted Impressions', value: data.impressions, icon: '👀' },
    { label: 'CTR (%)', value: data.ctr, icon: '📊' },
    { label: 'CPC (€)', value: data.cpc, icon: '💰' },
    { label: 'ROI (%)', value: data.roi, icon: '📈' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resultItems.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between"
        >
          <div>
            <div className="text-lg font-semibold">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSelectorResults;
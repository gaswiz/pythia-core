import React from 'react';
import './DashboardSelectorStyles.css';

const DashboardSelectorResults = ({ data }) => {
  if (!data) return null;

  const resultItems = [
    { label: 'Predicted Clicks', value: data.clicks },
    { label: 'Predicted Impressions', value: data.impressions },
    { label: 'CTR (%)', value: data.ctr },
    { label: 'CPC (€)', value: data.cpc },
    { label: 'ROI (%)', value: data.roi },
  ];

  return (
    <div className="dashboard-results-grid">
      {resultItems.map(({ label, value }) => (
        <div
          key={label}
          className="dashboard-result-card"
        >
          <div className="dashboard-result-label">{label}</div>
          <div className="dashboard-result-value">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSelectorResults;
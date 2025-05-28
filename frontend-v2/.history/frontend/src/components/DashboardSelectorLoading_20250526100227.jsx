import React from 'react';
import './DashboardSelectorStyles.css';

const DashboardSelectorLoading = () => {
  return (
    <div className="dashboard-loading">
      <div className="spinner" style={{
        width: '3rem',
        height: '3rem',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Running prediction...</p>
    </div>
  );
};

export default DashboardSelectorLoading;
import React from 'react';
import './DashboardSelectorStyles.css';

const DashboardSelectorBudgetControls = ({ formData, updateFormData, onBack, onNext }) => {
  return (
    <div className="space-y-8">
      <div className="dashboard-section">
        <h2 className="dashboard-heading">Select Campaign Duration (Days)</h2>
        <input
          type="range"
          min="1"
          max="30"
          value={formData.duration}
          onChange={(e) => updateFormData('duration', parseInt(e.target.value))}
          className="dashboard-slider"
        />
        <div className="dashboard-slider-value">{formData.duration} days</div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-heading">Select Budget (EUR)</h2>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={formData.budget}
          onChange={(e) => updateFormData('budget', parseInt(e.target.value))}
          className="dashboard-slider"
        />
        <div className="dashboard-slider-value">€{formData.budget}</div>
      </div>

      <div className="dashboard-actions">
        <button
          className="dashboard-button secondary"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className="dashboard-button primary"
          onClick={onNext}
        >
          Predict
        </button>
      </div>
    </div>
  );
};

export default DashboardSelectorBudgetControls;

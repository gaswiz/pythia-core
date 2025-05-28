import React, { useEffect, useState } from 'react';
import { getOptionsFromDataset } from './DashboardSelectorInputs';
import './DashboardSelectorStyles.css';

const DashboardSelectorStepForm = ({ formData, updateFormData, onNext }) => {
  const [options, setOptions] = useState({
    customer_segments: [],
    channels: [],
    campaign_types: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const datasetOptions = await getOptionsFromDataset();
      setOptions(datasetOptions);
    };
    fetchOptions();
  }, []);

  const renderOptions = (group, field) => (
    <div className="dashboard-section">
      <h2 className="dashboard-heading">Select {group}</h2>
      <div className="dashboard-options-grid">
        {options[field].map((item) => (
          <div
            key={item}
            className={`dashboard-option ${formData[field] === item ? 'active' : ''}`}
            onClick={() => updateFormData(field, item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderOptions('Customer Segment', 'customer_segment')}
      {renderOptions('Advertising Channel', 'channel_used')}
      {renderOptions('Campaign Type', 'campaign_type')}

      <div className="dashboard-actions">
        <div></div>
        <button
          className="dashboard-button primary"
          onClick={onNext}
          disabled={!(formData.customer_segment && formData.channel_used && formData.campaign_type)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DashboardSelectorStepForm;
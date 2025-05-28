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

  const sectionClass = "bg-white rounded-lg p-6 shadow-md border border-gray-200";
  const cardClass = (active) => `transition-all duration-200 text-sm md:text-base p-3 rounded-md border font-medium text-center cursor-pointer ${active ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100'}`;

  return (
    <div className="space-y-8">
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold mb-4">1️⃣ Select Customer Segment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.customer_segments.map(segment => (
            <div
              key={segment}
              className={cardClass(formData.customer_segment === segment)}
              onClick={() => updateFormData('customer_segment', segment)}
            >
              {segment}
            </div>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="text-lg font-semibold mb-4">2️⃣ Select Advertising Channel</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.channels.map(channel => (
            <div
              key={channel}
              className={cardClass(formData.channel_used === channel)}
              onClick={() => updateFormData('channel_used', channel)}
            >
              {channel}
            </div>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="text-lg font-semibold mb-4">3️⃣ Select Campaign Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.campaign_types.map(type => (
            <div
              key={type}
              className={cardClass(formData.campaign_type === type)}
              onClick={() => updateFormData('campaign_type', type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-40"
          onClick={onNext}
          disabled={!(formData.customer_segment && formData.channel_used && formData.campaign_type)}
        >
          Continue ➡️
        </button>
      </div>
    </div>
  );
};

export default DashboardSelectorStepForm;
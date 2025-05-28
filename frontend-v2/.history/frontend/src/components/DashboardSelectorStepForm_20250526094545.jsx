import React, { useEffect, useState } from 'react';
import { getOptionsFromDataset } from './DashboardSelectorInputs';

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">1️⃣ Select Customer Segment</h2>
        <div className="grid grid-cols-2 gap-2">
          {options.customer_segments.map(segment => (
            <button
              key={segment}
              className={`p-3 rounded-lg border ${formData.customer_segment === segment ? 'bg-blue-600 text-white' : 'bg-white'} hover:shadow-md`}
              onClick={() => updateFormData('customer_segment', segment)}
            >
              {segment}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">2️⃣ Select Advertising Channel</h2>
        <div className="grid grid-cols-2 gap-2">
          {options.channels.map(channel => (
            <button
              key={channel}
              className={`p-3 rounded-lg border ${formData.channel_used === channel ? 'bg-green-600 text-white' : 'bg-white'} hover:shadow-md`}
              onClick={() => updateFormData('channel_used', channel)}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">3️⃣ Select Campaign Type</h2>
        <div className="grid grid-cols-2 gap-2">
          {options.campaign_types.map(type => (
            <button
              key={type}
              className={`p-3 rounded-lg border ${formData.campaign_type === type ? 'bg-purple-600 text-white' : 'bg-white'} hover:shadow-md`}
              onClick={() => updateFormData('campaign_type', type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
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
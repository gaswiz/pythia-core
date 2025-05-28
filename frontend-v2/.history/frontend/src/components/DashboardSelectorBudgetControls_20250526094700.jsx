import React from 'react';

const DashboardSelectorBudgetControls = ({ formData, updateFormData, onBack, onNext }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">⏳ Select Campaign Duration (days)</h2>
        <input
          type="range"
          min="1"
          max="30"
          value={formData.duration}
          onChange={(e) => updateFormData('duration', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2">{formData.duration} days</div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">💰 Select Budget (EUR)</h2>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={formData.budget}
          onChange={(e) => updateFormData('budget', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2">€{formData.budget}</div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={onBack}
        >⬅️ Back</button>

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onNext}
        >Predict 📊</button>
      </div>
    </div>
  );
};

export default DashboardSelectorBudgetControls;
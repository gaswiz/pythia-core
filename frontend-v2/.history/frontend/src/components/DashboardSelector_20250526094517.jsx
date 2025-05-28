import React, { useState } from 'react';
import DashboardSelectorStepForm from './DashboardSelectorStepForm';
import DashboardSelectorBudgetControls from './DashboardSelectorBudgetControls';
import DashboardSelectorPredictor from './DashboardSelectorPredictor';
import DashboardSelectorResults from './DashboardSelectorResults';
import DashboardSelectorLoading from './DashboardSelectorLoading';

const DashboardSelector = () => {
  const [formData, setFormData] = useState({
    customer_segment: '',
    channel_used: '',
    campaign_type: '',
    duration: 7,
    budget: 1000,
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrediction = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await DashboardSelectorPredictor(formData);
      setResults(response);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
      handleNextStep();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Campaign Performance Predictor</h1>

      {step === 1 && (
        <DashboardSelectorStepForm
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
        />
      )}

      {step === 2 && (
        <DashboardSelectorBudgetControls
          formData={formData}
          updateFormData={updateFormData}
          onBack={handlePrevStep}
          onNext={handlePrediction}
        />
      )}

      {step === 3 && (
        loading ? <DashboardSelectorLoading /> : <DashboardSelectorResults data={results} />
      )}
    </div>
  );
};

export default DashboardSelector;

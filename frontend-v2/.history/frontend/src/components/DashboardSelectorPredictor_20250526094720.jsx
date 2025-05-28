const DashboardSelectorPredictor = async (formData) => {
  const response = await fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
};

export default DashboardSelectorPredictor;
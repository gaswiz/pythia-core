export const getOptionsFromDataset = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/dataset/options');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return {
      customer_segments: data.customer_segments || [],
      channels: data.channels || [],
      campaign_types: data.campaign_types || []
    };
  } catch (error) {
    console.error('Failed to load dataset options:', error);
    return {
      customer_segments: [],
      channels: [],
      campaign_types: []
    };
  }
};
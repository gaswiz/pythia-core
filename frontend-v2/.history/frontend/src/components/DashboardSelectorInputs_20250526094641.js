import Papa from 'papaparse';
import marketingData from '../../pythia/data/marketing_campaign_dataset.csv';

export const getOptionsFromDataset = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse(marketingData, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data;

        const unique = (key) => [...new Set(data.map(row => row[key]).filter(Boolean))];

        resolve({
          customer_segments: unique('Customer_Segment'),
          channels: unique('Channel_Used'),
          campaign_types: unique('Campaign_Type'),
        });
      },
      error: reject
    });
  });
};
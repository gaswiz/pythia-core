import React from 'react';
import './DashboardSelectorStyles.css';

const DashboardSelectorLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      <p className="mt-4 text-lg text-gray-700">Running prediction, please wait...</p>
    </div>
  );
};

export default DashboardSelectorLoading;
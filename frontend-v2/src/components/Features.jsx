/*
  File: /src/components/Features.jsx
  Description: Section highlighting key features of the P.Y.T.H.I.A. platform.
*/

import React from 'react';

export default function Features() {
  return (
    <section className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Discover how our simulation platform helps you forecast campaign success with smart, data-driven insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Upload Campaign Metadata</h3>
          <p className="text-gray-600 text-sm">
            Input budget, platform, duration, and target metrics to simulate performance.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">View Predicted Metrics</h3>
          <p className="text-gray-600 text-sm">
            See estimated CTR, conversions, and impressions with real-time feedback.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Export & Integrate</h3>
          <p className="text-gray-600 text-sm">
            Generate campaign reports and export to marketing dashboards or tools.
          </p>
        </div>
      </div>
    </section>
  );
}
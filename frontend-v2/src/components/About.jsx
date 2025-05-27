/*
  File: /src/components/About.jsx
  Description: About section describing the academic purpose of P.Y.T.H.I.A.
*/

import React from 'react';

export default function About() {
  return (
    <section className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Project</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        P.Y.T.H.I.A. (Predict Your Trends, Harnessing Intelligent Analytics) is a predictive analytics tool for evaluating digital ad campaigns.
        This project is part of a final-year thesis at the University of East London and showcases how machine learning can be used to simulate key metrics
        like CTR, impressions, and ROI before campaigns launch. It uses a React-based frontend, a Flask API backend, and real marketing datasets.
      </p>
    </section>
  );
}

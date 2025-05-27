import * as React from 'react';
import CampaignPerformanceChart from './ui/CampaignPerformanceChart';

export default function Simulation() {
  return (
    <section className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-purple-500 mb-4">
            Run Your Campaign Simulation
          </h1>
          <p className="text-lg text-gray-300">
            Fill in your expected inputs and preview forecasted campaign metrics below.
          </p>
        </header>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Industry"
            className="bg-neutral-900 border border-white text-white p-4"
          />
          <input
            type="number"
            placeholder="Budget (€)"
            className="bg-neutral-900 border border-white text-white p-4"
          />
          <input
            type="number"
            placeholder="Duration (days)"
            className="bg-neutral-900 border border-white text-white p-4"
          />
          <input
            type="number"
            placeholder="Target Impressions"
            className="bg-neutral-900 border border-white text-white p-4"
          />
          <button className="col-span-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 px-6 font-semibold">
            Run Simulation
          </button>
        </form>

        <CampaignPerformanceChart />
      </div>
    </section>
  );
}

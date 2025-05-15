import React from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const metrics = [
    { label: 'CTR (Click-Through Rate)', value: '3.7%' },
    { label: 'Avg. CPC (Cost per Click)', value: '$1.20' },
    { label: 'Estimated ROI', value: '158%' },
    { label: 'Conversion Rate', value: '5.1%' },
  ];

  const rows = [
    { campaign: 'Tech Awareness', budget: '$1000', clicks: 892, impressions: 24100, cpc: '$1.12' },
    { campaign: 'Ecommerce Boost', budget: '$1500', clicks: 1250, impressions: 33200, cpc: '$1.20' },
    { campaign: 'SaaS Growth', budget: '$900', clicks: 650, impressions: 18400, cpc: '$1.38' },
  ];

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="dashboard"
    >
      <h2>Performance Overview</h2>

      <div className="metrics-grid">
        {metrics.map((m, index) => (
          <motion.div
            key={index}
            className="metric-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Budget</th>
              <th>Clicks</th>
              <th>Impressions</th>
              <th>Avg. CPC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.campaign}</td>
                <td>{r.budget}</td>
                <td>{r.clicks}</td>
                <td>{r.impressions}</td>
                <td>{r.cpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Dashboard;

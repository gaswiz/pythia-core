import React, { useState } from 'react';
import './PredictionTool.css';
import { motion } from 'framer-motion';
import { FaMagic } from 'react-icons/fa';
import { getFieldClass } from './FieldValidator';

const PredictionTool = () => {
  const [form, setForm] = useState({
    budget: '',
    duration: '',
    impressions: ''
  });

  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { budget, duration, impressions } = form;

    if (!budget || !duration || !impressions) {
      setError(true);
      return;
    }

    // Simulated prediction result — replace with actual API call later
    setResult({
      ctr: '2.8%',
      cpc: '$1.05',
      roi: '145%',
      conversions: '4.6%'
    });
  };

  return (
    <motion.div
      className="prediction-tool"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="predict"
    >
      <h2>Predict Campaign Performance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="budget"
          placeholder="Budget (USD)"
          value={form.budget}
          onChange={handleChange}
          className={getFieldClass(form.budget, error)}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={form.duration}
          onChange={handleChange}
          className={getFieldClass(form.duration, error)}
        />
        <input
          type="number"
          name="impressions"
          placeholder="Expected Impressions"
          value={form.impressions}
          onChange={handleChange}
          className={getFieldClass(form.impressions, error)}
        />
        <motion.button whileHover={{ scale: 1.05 }} type="submit">
          <FaMagic /> Predict
        </motion.button>
      </form>

      {result && (
        <motion.div className="prediction-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>📊Predicted Performance</h3>
          <div className="summary-grid">
            <div className="metric-card">
              <p className="metric-label">Estimated CTR</p>
              <p className="metric-value">{result.ctr}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Avg. CPC</p>
              <p className="metric-value">{result.cpc}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Projected ROI</p>
              <p className="metric-value">{result.roi}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Conversion Rate</p>
              <p className="metric-value">{result.conversions}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PredictionTool;

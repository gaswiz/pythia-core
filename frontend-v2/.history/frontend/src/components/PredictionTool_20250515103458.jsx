import React, { useState } from 'react';
import './PredictionTool.css';
import { motion } from 'framer-motion';
import { FaMagic } from 'react-icons/fa';

const PredictionTool = () => {
  const [form, setForm] = useState({
    budget: '',
    duration: '',
    impressions: ''
  });
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    // Placeholder: insert API logic here
    console.log('Predicting with:', form);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
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
          className={error && !form.budget ? 'glow-error' : ''}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={form.duration}
          onChange={handleChange}
          className={error && !form.duration ? 'glow-error' : ''}
        />
        <input
          type="number"
          name="impressions"
          placeholder="Expected Impressions"
          value={form.impressions}
          onChange={handleChange}
          className={error && !form.impressions ? 'glow-error' : ''}
        />
        <motion.button whileHover={{ scale: 1.05 }} type="submit">
          <FaMagic /> Predict
        </motion.button>
      </form>

      {submitted && (
        <motion.div className="prediction-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          📊 Prediction complete — results will appear here soon!
        </motion.div>
      )}
    </motion.div>
  );
};

export default PredictionTool;

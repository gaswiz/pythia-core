import React, { useState } from 'react';
import './RecommendationTool.css';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const RecommendationTool = () => {
  const [inputs, setInputs] = useState({
    industry: '',
    goal: '',
    cpc: ''
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    const { industry, goal, cpc } = inputs;

    if (!industry || !goal || !cpc) {
      setError(true);
      return;
    }

    // Simulate API call
    console.log('Requesting recommendation for:', inputs);
    setRecommendation({
      budget: 1500,
      duration: 12,
      note: 'Ideal for similar campaigns in tech sector'
    });
  };

  return (
    <motion.div
      className="recommendation-tool"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="recommend"
    >
      <h2>Get Smart Recommendations</h2>
      <form onSubmit={handleRecommend}>
        <input
          type="text"
          name="industry"
          placeholder="Industry (e.g. Tech)"
          value={inputs.industry}
          onChange={handleChange}
          className={error && !inputs.industry ? 'glow-error' : ''}
        />
        <input
          type="text"
          name="goal"
          placeholder="Campaign Goal (e.g. Conversions)"
          value={inputs.goal}
          onChange={handleChange}
          className={error && !inputs.goal ? 'glow-error' : ''}
        />
        <input
          type="number"
          name="cpc"
          placeholder="Avg. CPC ($)"
          value={inputs.cpc}
          onChange={handleChange}
          className={error && !inputs.cpc ? 'glow-error' : ''}
        />
        <motion.button whileHover={{ scale: 1.05 }} type="submit">
          <FaLightbulb /> Recommend
        </motion.button>
      </form>

      {recommendation && (
        <motion.div className="recommendation-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          💡 Recommended Budget: ${recommendation.budget}<br />
          📅 Duration: {recommendation.duration} days<br />
          📝 Note: {recommendation.note}
        </motion.div>
      )}

      <div className="shap-placeholder">
        <p>📊 SHAP Insights: Coming soon...</p>
      </div>
    </motion.div>
  );
};

export default RecommendationTool;

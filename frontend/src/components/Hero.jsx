import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
  return (
    <section id="hero" className="hero-wrapper">
      <div className="hero-centered">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1>
            Predict Your <span className="highlight">Trends</span>.<br />
            Empower Your <span className="highlight">Campaigns</span>.
          </h1>
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
    
  );
};

export default Hero;

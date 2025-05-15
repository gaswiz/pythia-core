import React from 'react';
import './ScrollIndicator.css';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const ScrollIndicator = () => {
  return (
    <motion.div
      className="scroll-indicator"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <FaChevronDown size={24} />
    </motion.div>
  );
};

export default ScrollIndicator;

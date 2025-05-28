import React from 'react';
import './MenuBar.css';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const MenuBar = () => {
  return (
    <motion.nav
      className="menu-bar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ul>
        <li>
          <Link to="hero" smooth={true} duration={600}>Home</Link>
        </li>
        <li>
          <Link to="upload" smooth={true} duration={600}>Upload</Link>
        </li>
        <li>
          <Link to="predict" smooth={true} duration={600}>Predict</Link>
        </li>
        <li>
          <Link to="recommend" smooth={true} duration={600}>Recommend</Link>
        </li>
        <li>
          <Link to="dashboard" smooth={true} duration={600}>Dashboard</Link>
        </li>
      </ul>
    </motion.nav>
  );
};

export default MenuBar;

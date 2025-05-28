import React from 'react';
import './MenuBar.css';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'hero', label: 'Home' },
  { id: 'upload', label: 'Upload' },
  { id: 'predict', label: 'Predict' },
  { id: 'recommend', label: 'Recommend' },
  { id: 'dashboard', label: 'Dashboard' },
];

const MenuBar = () => {
  return (
    <motion.nav
      className="menu-bar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link to={item.id} smooth={true} duration={600}>
              <button className="menu-button">{item.label}</button>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default MenuBar;

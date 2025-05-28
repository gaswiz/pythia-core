import React from 'react';
import './Footer.css';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>About Project</h4>
          <p>P.Y.T.H.I.A. is a predictive analytics tool for digital marketing campaigns using AI and ML models.</p>
        </div>
        <div className="footer-col">
          <h4>Frontend Structure</h4>
          <ul>
            <li>/components</li>
            <li>/Hero.jsx</li>
            <li>/PredictionTool.jsx</li>
            <li>/RecommendationTool.jsx</li>
            <li>/Dashboard.jsx</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Links</h4>
          <a
            href="https://github.com/gaswiz/pythia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="github-icon" /> GitHub Repository
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} P.Y.T.H.I.A. — University of East London</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Footer.css';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} P.Y.T.H.I.A. — University of East London
        </p>
        <a href="https://github.com/gaswiz/pythia" target="_blank" rel="noopener noreferrer">
          <FaGithub className="github-icon" /> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;

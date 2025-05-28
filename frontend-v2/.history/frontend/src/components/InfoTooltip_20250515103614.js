import React from 'react';
import './InfoTooltip.css';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const InfoTooltip = ({ id, text }) => {
  return (
    <>
      <FaInfoCircle data-tip data-for={id} className="info-icon" />
      <ReactTooltip id={id} place="top" effect="solid" className="tooltip-box">
        {text}
      </ReactTooltip>
    </>
  );
};

export default InfoTooltip;

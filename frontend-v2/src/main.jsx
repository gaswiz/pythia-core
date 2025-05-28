/*
  File: /src/main.jsx
  Description: Entry point that renders the main App component for P.Y.T.H.I.A.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
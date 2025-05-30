import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import UnifiedLandingPage from './components/UnifiedLandingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UnifiedLandingPage />
  </React.StrictMode>
);




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulate" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

import React from 'react';
import './index.css';
import PredictionForm from './components/PredictionForm';
import RecommendationForm from './components/RecommendationForm';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>P.Y.T.H.I.A. – Predict Your Trends</h1>
        <p>AI-Powered Campaign Forecasting</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>Upload Historical Campaign Data</h2>
          <FileUploader />
        </section>

        <section className="section">
          <h2>Predict Campaign Performance</h2>
          <PredictionForm />
        </section>

        <section className="section">
          <h2>Get Recommendations by Budget</h2>
          <RecommendationForm />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 P.Y.T.H.I.A. Project – Konstantinos Panagiotaropoulos</p>
      </footer>
    </div>
  );
}

export default App;

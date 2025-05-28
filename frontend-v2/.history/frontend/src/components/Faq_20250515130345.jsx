import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'What machine learning models are used in P.Y.T.H.I.A.?',
    answer: 'We use Linear Regression and Poisson Regression for performance prediction. Future plans include tree-based models.'
  },
  {
    question: 'How does the backend handle uploaded CSV files?',
    answer: 'The Flask backend accepts CSV files via the `/upload` endpoint, parses them using pandas, and stores metadata in PostgreSQL.'
  },
  {
    question: 'Can I test the API with Postman?',
    answer: 'Yes, you can send POST requests to `/predict` with a JSON body. Example tests will be added soon with authentication flows.'
  },
  {
    question: 'What is the folder structure for the backend?',
    answer: `The backend is organised into:
- \`/api/\` for Flask routes
- \`/models/\` for ML logic
- \`/data/\` for input/output files
- \`app.py\` for the main server entry`
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq-section" id="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <button className="faq-question" onClick={() => toggleAnswer(index)}>
              {item.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
              <pre>{item.answer}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;

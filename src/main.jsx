import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global CSS — order matters: design tokens first, then the portfolio kit,
// then app-level overrides (smooth scrolling, etc.).
import './styles/styles.css';
import './styles/portfolio.css';
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

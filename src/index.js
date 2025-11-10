import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Removed StrictMode to prevent double initialization of Salesforce chat in development
root.render(<App />);


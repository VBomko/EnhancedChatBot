import React, { useEffect, useState } from 'react';
import SalesforceChatBot from './SalesforceChatBot';

function App() {
  const [chatInitialized, setChatInitialized] = useState(false);

  useEffect(() => {
    // Initialize Salesforce chat when component mounts
    const timer = setTimeout(() => {
      setChatInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {chatInitialized && <SalesforceChatBot />}
    </div>
  );
}

export default App;


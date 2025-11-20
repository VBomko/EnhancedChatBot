// import React, { useEffect, useState } from 'react';
// import SalesforceChatBot from './SalesforceChatBot';

// function App() {
//   const [chatInitialized, setChatInitialized] = useState(false);

//   useEffect(() => {
//     // Initialize Salesforce chat when component mounts
//     const timer = setTimeout(() => {
//       setChatInitialized(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="app-container">
//       {chatInitialized && <SalesforceChatBot />}
//     </div>
//   );
// }

// export default App;


import React from 'react';

function App() {
  return (
    <div className="app-container">
      <iframe 
        src="/salesforceChatBot.html"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: 9999
        }}
        title="Salesforce ChatBot"
      />
    </div>
  );
}

export default App;

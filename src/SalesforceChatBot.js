import React, { useEffect, useRef } from 'react';

const SalesforceChatBot = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) {
      return;
    }

    // Initialize Salesforce Embedded Messaging
    const initEmbeddedMessaging = () => {
      try {
        if (window.embeddedservice_bootstrap && !initialized.current) {
          initialized.current = true;
          
          // Set language
          window.embeddedservice_bootstrap.settings.language = 'en_US';

          // Initialize with your Salesforce configuration
          window.embeddedservice_bootstrap.init(
            '00DH30000000naQ', // Organization ID
            'Compiller', // Deployment Name
            'https://megaport--peeklogicd.sandbox.my.site.com/ESWCompiller1762441909882', // Site URL
            {
              scrt2URL: 'https://megaport--peeklogicd.sandbox.my.salesforce-scrt.com'
            }
          );
        }
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
        initialized.current = false; // Reset on error to allow retry
      }
    };

    // Check if script is already loaded in the DOM
    const existingScript = document.querySelector('script[src*="bootstrap.min.js"]');
    
    if (existingScript) {
      // Script already exists, just initialize if not done yet
      if (window.embeddedservice_bootstrap && !initialized.current) {
        initEmbeddedMessaging();
      }
    } else if (!window.embeddedservice_bootstrap) {
      // Load the Salesforce Embedded Messaging bootstrap script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://megaport--peeklogicd.sandbox.my.site.com/ESWCompiller1762441909882/assets/js/bootstrap.min.js';
      script.onload = initEmbeddedMessaging;
      script.onerror = (error) => {
        console.error('Failed to load Embedded Messaging script:', error);
        initialized.current = false;
      };
      document.body.appendChild(script);
    }

    // Cleanup function - do not remove script or widget to prevent re-initialization issues
    return () => {
      // Intentionally empty - Salesforce widget should persist
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SalesforceChatBot;


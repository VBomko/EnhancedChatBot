import React, { useEffect, useRef } from 'react';

const SalesforceChatBot = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) {
      return;
    }

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        window.ipAddress = data.ip;
        console.log('window.ipAddress from embedded service', window.ipAddress);
    })
    .catch(error => {
        console.error('Error fetching IP from embedded service:', error);
        window.ipAddress = null;
    });

    // Initialize Salesforce Embedded Messaging
    const initEmbeddedMessaging = () => {
      try {
        if (window.embeddedservice_bootstrap && !initialized.current) {
          initialized.current = true;
          
          // Set language
          window.embeddedservice_bootstrap.settings.language = 'en_US';

          // Initialize with your Salesforce configuration
          embeddedservice_bootstrap.init(
                '00DH30000000naQ',
                'Render',
                'https://megaport--peeklogicd.sandbox.my.site.com/ESWRender1762778032713',
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
      script.src = 'https://megaport--peeklogicd.sandbox.my.site.com/ESWRender1762778032713/assets/js/bootstrap.min.js';
      script.onload = initEmbeddedMessaging;
      script.onerror = (error) => {
        console.error('Failed to load Embedded Messaging script:', error);
        initialized.current = false;
      };
      document.body.appendChild(script);
    }


  }, []);

  return null; // This component doesn't render anything visible
};

export default SalesforceChatBot;


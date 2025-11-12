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

    // Add event listener for restart conversation
    const handleRestartConversation = () => {
      console.log("Restart conversation event received");
      
      try {
        // Check if embedded_svc is available
        if (window.embedded_svc && window.embedded_svc.liveAgentAPI) {
          console.log("Ending current chat...");
          
          // End the current chat
          window.embedded_svc.liveAgentAPI.endChat().then(() => {
            console.log("Chat ended successfully");
            
            // Start a new chat after a brief delay
            setTimeout(() => {
              console.log("Starting new chat...");
              if (window.embedded_svc && window.embedded_svc.liveAgentAPI) {
                window.embedded_svc.liveAgentAPI.startChat({
                  directToButtonRouting: function() {},
                  prepopulatedPrechatFields: {}
                }).then(() => {
                  console.log("New chat started successfully");
                }).catch((err) => {
                  console.error("Error starting new chat:", err);
                });
              }
            }, 500);
          }).catch((err) => {
            console.error("Error ending chat:", err);
          });
        } else {
          console.warn("Salesforce Embedded Service API not available");
        }
      } catch (err) {
        console.error("Error handling restart conversation:", err);
      }
    };

    // Add the event listener to the document
    document.addEventListener('restartconversation', handleRestartConversation);

    // Cleanup function - remove event listener
    return () => {
      document.removeEventListener('restartconversation', handleRestartConversation);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SalesforceChatBot;


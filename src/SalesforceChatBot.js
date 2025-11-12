import React, { useEffect, useRef } from 'react';

const SalesforceChatBot = () => {
  const initialized = useRef(false);
  const ipAddress = useRef(null);

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) {
      return;
    }

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        ipAddress.current = data.ip;
        globalThis.ipAddress = data.ip;
        console.log('IP Address fetched:', data.ip);
        
        // Send IP to Salesforce iframe if it's already loaded
        sendIPToSalesforce(data.ip);
    })
    .catch(error => {
        console.error('Error fetching IP:', error);
        ipAddress.current = null;
        globalThis.ipAddress = null;
    });

    // Function to send IP address via postMessage to Salesforce iframe
    const sendIPToSalesforce = (ip) => {
      if (!ip) return;
      
      // Find the Salesforce chat iframe
      const chatIframe = document.querySelector('iframe[title*="chat"], iframe[title*="messaging"], iframe[src*="salesforce"]');
      
      if (chatIframe && chatIframe.contentWindow) {
        const message = {
          type: 'CUSTOM_EVENT',
          eventName: 'IP_ADDRESS_CAPTURED',
          data: {
            ipAddress: ip,
            timestamp: new Date().toISOString(),
            source: 'EnhancedChatBot'
          }
        };
        
        try {
          chatIframe.contentWindow.postMessage(message, '*');
          console.log('IP address sent via postMessage:', message);
        } catch (error) {
          console.error('Error sending postMessage:', error);
        }
      } else {
        console.log('Salesforce iframe not found yet, will retry when chat opens');
      }
    };

    // Listen for Salesforce chat events to send IP when chat is ready
    const setupMessageListener = () => {
      window.addEventListener('message', (event) => {
        // Check if message is from Salesforce
        if (event.data && typeof event.data === 'object') {
          console.log('Received message from iframe:', event.data);
          
          // When chat is opened or ready, send the IP
          if (event.data.method === 'liveagent.chatEstablished' || 
              event.data.type === 'chasitor.chatEstablished' ||
              event.data.method === 'chasitor.sendMessage') {
            console.log('Chat established or ready, sending IP address');
            if (ipAddress.current) {
              sendIPToSalesforce(ipAddress.current);
            }
          }
        }
      });
    };

    // Set up event listeners
    setupMessageListener();

    // Initialize Salesforce Embedded Messaging
    const initEmbeddedMessaging = () => {
      try {
        if (window.embeddedservice_bootstrap && !initialized.current) {
          initialized.current = true;
          
          // Set language
          window.embeddedservice_bootstrap.settings.language = 'en_US';

          // Add event handlers for Salesforce events
          window.embeddedservice_bootstrap.settings.prepopulatedPrechatFields = {
            // You can add IP as a prechat field if configured in Salesforce
          };

          // Hook into chat events
          window.addEventListener('onEmbeddedMessagingReady', () => {
            console.log('Embedded Messaging Ready - sending IP');
            if (ipAddress.current) {
              setTimeout(() => sendIPToSalesforce(ipAddress.current), 1000);
            }
          });

          // Initialize with your Salesforce configuration
          embeddedservice_bootstrap.init(
                '00DH30000000naQ',
                'Render',
                'https://megaport--peeklogicd.sandbox.my.site.com/ESWRender1762778032713',
                {
                    scrt2URL: 'https://megaport--peeklogicd.sandbox.my.salesforce-scrt.com'
                }
            );

          // Try to send IP after initialization
          setTimeout(() => {
            if (ipAddress.current) {
              sendIPToSalesforce(ipAddress.current);
            }
          }, 2000);
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


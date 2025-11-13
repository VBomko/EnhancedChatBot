import React, { useEffect, useRef } from 'react';

const SalesforceChatBot = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) {
      return;
    }

    // Function to fetch IP address
    const fetchIPAddress = () => {
      console.log('🔄 Fetching IP address...');
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          // Store in window object (like original code)
          window.ipAddress = data.ip;
          console.log('✅ IP Address fetched and stored:', window.ipAddress);
          console.log('window.ipAddress from Embedded:', window.ipAddress);
          // Send IP to LWC
          sendMessageToLWC({
            action: 'IP_ADDRESS_RESPONSE',
            ipAddress: data.ip,
            timestamp: new Date().toISOString()
          });
        })
        .catch(error => {
          console.error('❌ Error fetching IP:', error);
          window.ipAddress = null;
          // Send error to LWC
          sendMessageToLWC({
            action: 'IP_ADDRESS_ERROR',
            error: error.message,
            timestamp: new Date().toISOString()
          });
        });
    };

    // Function to send messages to LWC
    const sendMessageToLWC = (data) => {
      // Find the iframe containing the LWC component
      const lwcIframe = document.getElementById('embeddedMessagingFrame');
      if (lwcIframe && lwcIframe.contentWindow) {
        lwcIframe.contentWindow.postMessage(data, '*');
        console.log('📤 Sent to LWC:', data);
      } else {
        // If iframe not immediately available, try again after a delay
        console.log('⏳ LWC iframe not found, retrying...');
        setTimeout(() => {
          const retryIframe = document.getElementById('embeddedMessagingFrame');
          if (retryIframe && retryIframe.contentWindow) {
            retryIframe.contentWindow.postMessage(data, '*');
            console.log('📤 Sent to LWC (retry):', data);
          } else {
            console.error('❌ Could not find LWC iframe');
          }
        }, 1000);
      }
    };

    // Function to handle messages from LWC
    const handleLWCMessage = (data) => {
      switch (data.action) {
        case 'GET_IP_ADDRESS':
          console.log('📨 LWC requested IP address');
          // If IP already fetched, send it immediately
          if (window.ipAddress) {
            console.log('✅ IP already available, sending to LWC:', window.ipAddress);
            sendMessageToLWC({
              action: 'IP_ADDRESS_RESPONSE',
              ipAddress: window.ipAddress,
              timestamp: new Date().toISOString()
            });
          } else {
            // Otherwise fetch it
            fetchIPAddress();
          }
          break;
        case 'ANALYTICS_EVENT':
          handleAnalyticsEvent(data.eventType, data.detail);
          break;
        case 'REGION_FETCHED':
          // Store region in window object (like original code)
          window.geoIpRegion = data.region;
          console.log('✅ Region received from LWC and stored:', window.geoIpRegion);
          console.log('window.geoIpRegion from Embedded:', window.geoIpRegion);
          break;
        default:
          console.log('Unknown action from LWC:', data.action);
      }
    };

    // Function to handle analytics events
    const handleAnalyticsEvent = (eventType, detail) => {
      console.log('📊 Handling analytics event:', eventType, detail);
      if (window.insent && window.insent[eventType]) {
        window.insent[eventType]({ detail: detail });
      } else {
        console.warn('⚠️ Analytics event handler not found:', eventType);
      }
    };

    // Function to set up analytics events
    const setupAnalyticsEvents = () => {
      // Start Conversation Event
      window.insent.startConversation = function(event) {
        window.dataLayer.push({
          'event': 'startConversation',
          'eventCategory': 'Chat',
          'eventAction': 'Start Conversation',
          'eventLabel': event.detail ? event.detail.conversationId : 'Unknown'
        });
        console.log('📊 Start Conversation tracked');
      };

      // Email Capture Event
      window.insent.emailCapture = function(event) {
        window.dataLayer.push({
          'event': 'emailCapture',
          'eventCategory': 'Chat',
          'eventAction': 'Email Captured',
          'eventLabel': event.detail ? event.detail.email : 'Unknown'
        });
        if (window.analytics &&
          window.OnetrustActiveGroups &&
          window.OnetrustActiveGroups.includes('C0004') &&
          event.input &&
          event.input.key &&
          event.input.value &&
          (event.input.key.toLowerCase() === 'email')) {
          window.analytics.track(
            'Chat Engaged',
            { chat_source: 'zoominfo', chat_action: 'email captured' }
          );
          window.analytics.identify({ 'email': event.input.value });
        }
        console.log('📊 Email Capture tracked');
      };

      // Phone Number Capture Event
      window.insent.phoneNumberCapture = function(event) {
        window.dataLayer.push({
          'event': 'phoneNumberCapture',
          'eventCategory': 'Chat',
          'eventAction': 'Phone Number Captured',
          'eventLabel': event.detail ? event.detail.phoneNumber : 'Unknown'
        });
        if (window.analytics &&
          window.OnetrustActiveGroups &&
          window.OnetrustActiveGroups.includes('C0004')) {
          window.analytics.track(
            'Chat Engaged',
            { chat_source: 'zoominfo', chat_action: 'phone number captured' }
          );
        }
        console.log('📊 Phone Number Capture tracked');
      };

      // Calendar Booked Event
      window.insent.calendarBooked = function(event) {
        window.dataLayer.push({
          'event': 'calendarBooked',
          'eventCategory': 'Chat',
          'eventAction': 'Calendar Booked',
          'eventLabel': event.detail ? event.detail.meetingId : 'Unknown'
        });
        if (window.analytics &&
          window.OnetrustActiveGroups &&
          window.OnetrustActiveGroups.includes('C0004')) {
          window.analytics.track(
            'Chat Engaged',
            { chat_source: 'zoominfo', chat_action: 'calendar booked' }
          );
        }
        console.log('📊 Calendar Booked tracked');
      };

      // Calendar Link Clicked Event
      window.insent.calendarLinkClicked = function(event) {
        window.dataLayer.push({
          'event': 'calendarLinkClicked',
          'eventCategory': 'Chat',
          'eventAction': 'Calendar Link Clicked',
          'eventLabel': 'Calendar Link'
        });
        console.log('📊 Calendar Link Clicked tracked');
      };

      // Button Clicked Event
      window.insent.buttonClicked = function(event) {
        window.dataLayer.push({
          'event': 'buttonClicked',
          'eventCategory': 'Chat',
          'eventAction': 'Button Clicked',
          'eventLabel': event.detail ? event.detail.buttonName : 'Unknown'
        });
        console.log('📊 Button Clicked tracked:', event.detail ? event.detail.buttonName : 'Unknown');
      };

      // Greeting Message Closed Event
      window.insent.greetingMessageClosed = function(event) {
        window.dataLayer.push({
          'event': 'greetingMessageClosed',
          'eventCategory': 'Chat',
          'eventAction': 'Greeting Message Closed',
          'eventLabel': 'Chat Greeting'
        });
        console.log('📊 Greeting Message Closed tracked');
      };

      // Live Agent Unavailable Event
      window.insent.liveAgentUnavailable = function(event) {
        window.dataLayer.push({
          'event': 'liveAgentUnavailable',
          'eventCategory': 'Chat',
          'eventAction': 'Live Agent Unavailable',
          'eventLabel': 'No Agent Available'
        });
        console.log('📊 Live Agent Unavailable tracked');
      };

      console.log('✅ Analytics events set up');
    };

    // Initialize Salesforce Embedded Messaging
    const initEmbeddedMessaging = () => {
      try {
        if (window.embeddedservice_bootstrap && !initialized.current) {
          initialized.current = true;

          // Set language
          window.embeddedservice_bootstrap.settings.language = 'en_US';

          // Initialize analytics object
          window.insent = window.insent || {};
          window.dataLayer = window.dataLayer || [];

          // Initialize storage for IP address and region (like original code)
          window.ipAddress = null;
          window.geoIpRegion = null;

          // Set up analytics event handlers
          setupAnalyticsEvents();

          // Listen for messages from LWC
          window.addEventListener('message', function(event) {
            console.log('📥 Embedded script received:', event.data);
            if (event.data && event.data.action) {
              handleLWCMessage(event.data);
            }
          });

          // Initialize with your Salesforce configuration
          window.embeddedservice_bootstrap.init(
            '00DH30000000naQ',
            'Render',
            'https://megaport--peeklogicd.sandbox.my.site.com/ESWRender1762778032713',
            {
              scrt2URL: 'https://megaport--peeklogicd.sandbox.my.salesforce-scrt.com'
            }
          );
          console.log('✅ Embedded Messaging initialized');
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

    // Cleanup function
    return () => {
      // Note: We don't remove the script or event listeners on unmount
      // to prevent issues with the Salesforce chat persisting across page navigations
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SalesforceChatBot;

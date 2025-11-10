# Salesforce Embedded Service Setup Guide

This guide will help you configure the Salesforce Embedded Service Chat Bot for your organization.

## Prerequisites

1. Salesforce Service Cloud license
2. System Administrator access to your Salesforce org
3. Chat deployment configured in Salesforce

## Configuration Steps

### Step 1: Get Your Salesforce Credentials

You need to obtain the following information from your Salesforce org:

1. **Organization ID** (starts with `00D`)
   - Go to Setup → Company Information
   - Copy the Organization ID

2. **Deployment ID** (starts with `572`)
   - Go to Setup → Embedded Service Deployments
   - Select your deployment
   - Copy the Deployment ID

3. **Button ID** (starts with `573`)
   - In your Embedded Service Deployment
   - Go to the Chat Buttons & Invitations section
   - Copy the Button ID

4. **Salesforce Instance URL**
   - Your Salesforce domain (e.g., `https://yourcompany.my.salesforce.com`)

5. **Site URL**
   - Go to Setup → Sites
   - Copy your site URL (e.g., `https://yourcompany.my.salesforce-sites.com/liveAgentSetupFlow`)

6. **Live Agent URLs**
   - baseLiveAgentContentURL (e.g., `https://c.la1-c1-ia4.salesforceliveagent.com/content`)
   - baseLiveAgentURL (e.g., `https://d.la1-c1-ia4.salesforceliveagent.com/chat`)

7. **ESW Live Agent Dev Name**
   - The API name of your Embedded Service deployment

### Step 2: Update the Configuration

Open `src/SalesforceChatBot.js` and replace the following placeholders:

```javascript
window.embedded_svc.init(
  'https://yourinstance.my.salesforce.com', // Replace with your Salesforce org URL
  'https://yourinstance.my.salesforce-sites.com/liveAgentSetupFlow', // Replace with your Site URL
  gslbBaseURL,
  'YOUR_ORG_ID', // Replace with your Organization ID (00D...)
  'YOUR_DEPLOYMENT_NAME', // Replace with your Chat deployment name
  {
    baseLiveAgentContentURL: 'https://c.la1-c1-ia4.salesforceliveagent.com/content', // Update if different
    deploymentId: 'YOUR_DEPLOYMENT_ID', // Replace with your Deployment ID (572...)
    buttonId: 'YOUR_BUTTON_ID', // Replace with your Button ID (573...)
    baseLiveAgentURL: 'https://d.la1-c1-ia4.salesforceliveagent.com/chat', // Update if different
    eswLiveAgentDevName: 'YOUR_ESW_LIVE_AGENT_DEV_NAME', // Replace with your ESW Live Agent Dev Name
    isOfflineSupportEnabled: false
  }
);
```

Also update the script source URL:

```javascript
script.setAttribute(
  'src',
  'https://yourinstance.my.salesforce.com/embeddedservice/5.0/esw.min.js' // Replace with your instance
);
```

### Step 3: Configure Settings (Optional)

In `src/SalesforceChatBot.js`, you can customize various settings:

```javascript
window.embedded_svc.settings = {
  displayHelpButton: true, // Show/hide the chat button
  language: 'en', // Set language (e.g., 'en', 'es', 'fr')
  defaultMinimizedText: 'Chat with us', // Text on minimized chat button
  disabledMinimizedText: 'Agent Offline', // Text when agents are offline
  storageDomain: 'yourdomain.com', // Your domain for cookies
  devMode: true, // Set to false in production
  // ... other settings
};
```

### Step 4: Pre-populate Fields (Optional)

You can pre-populate chat fields with user information:

```javascript
window.embedded_svc.settings.prepopulatedPrechatFields = {
  FirstName: "John",
  LastName: "Doe",
  Email: "john.doe@example.com"
};
```

### Step 5: Testing

1. Set `devMode: true` in the settings for testing
2. Run the application: `npm start`
3. Click the chat button to test the integration
4. Verify that the chat window opens and connects to your Salesforce org

### Step 6: Production Deployment

Before deploying to production:

1. Set `devMode: false` in `src/SalesforceChatBot.js`
2. Update `storageDomain` to your production domain
3. Verify all credentials are correct
4. Test thoroughly in a staging environment
5. Build the production bundle: `npm run build`

## Troubleshooting

### Chat button doesn't appear
- Verify all IDs and URLs are correct
- Check browser console for errors
- Ensure Embedded Service is enabled in Salesforce
- Check that agents are online

### Connection errors
- Verify your Salesforce org URL is correct
- Check that the Site is active in Salesforce
- Ensure CORS settings allow your domain
- Verify Live Agent URLs are correct

### Authentication issues
- Check Organization ID is correct
- Verify Deployment ID and Button ID match
- Ensure your Salesforce user has proper permissions

## Additional Resources

- [Salesforce Embedded Service Documentation](https://developer.salesforce.com/docs/atlas.en-us.snapins_web_dev.meta/snapins_web_dev/)
- [Embedded Service Setup Guide](https://help.salesforce.com/s/articleView?id=sf.snapins_web_setup.htm)
- [Live Agent Configuration](https://help.salesforce.com/s/articleView?id=sf.live_agent_intro.htm)

## Support

For Salesforce-specific issues, contact Salesforce Support or consult the Salesforce documentation.


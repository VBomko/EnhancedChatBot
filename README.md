# Enhanced ChatBot Demo

A React-based demo application showcasing Salesforce Embedded Service Chat Bot integration. This single-page application provides a modern, responsive interface for demonstrating customer support capabilities powered by Salesforce Service Cloud.

## 🚀 Features

- **Modern React Application**: Built with React 18 and Webpack 5
- **Salesforce Integration**: Fully integrated Salesforce Embedded Service Chat Bot
- **Responsive Design**: Beautiful UI that works seamlessly on all devices
- **Easy Configuration**: Simple setup process with detailed documentation
- **Production Ready**: Optimized build configuration for deployment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Salesforce Service Cloud account with Embedded Service enabled

## 🛠️ Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd D:\Projects\Megaport\EnhancedChatBot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Salesforce credentials**:
   - Open `src/SalesforceChatBot.js`
   - Replace the placeholder values with your Salesforce credentials
   - See `SALESFORCE_SETUP.md` for detailed configuration instructions

## 🎯 Quick Start

### Development Mode

Start the development server with hot reloading:

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Production Build

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `build/` directory, ready for deployment.

## 📁 Project Structure

```
EnhancedChatBot/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.js                  # Main application component
│   ├── SalesforceChatBot.js    # Salesforce chat bot integration
│   ├── index.js                # Application entry point
│   └── styles.css              # Global styles
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── webpack.config.js           # Webpack configuration
├── README.md                   # This file
└── SALESFORCE_SETUP.md         # Salesforce configuration guide
```

## ⚙️ Configuration

### Salesforce Setup

To connect your Salesforce org, you need to configure the following in `src/SalesforceChatBot.js`:

1. **Organization ID** - Your Salesforce org ID (starts with `00D`)
2. **Deployment ID** - Your chat deployment ID (starts with `572`)
3. **Button ID** - Your chat button ID (starts with `573`)
4. **Instance URLs** - Your Salesforce instance and site URLs
5. **Live Agent URLs** - Your Live Agent content and chat URLs

For detailed step-by-step instructions, see **[SALESFORCE_SETUP.md](./SALESFORCE_SETUP.md)**

### Customization

You can customize the chat bot behavior in `src/SalesforceChatBot.js`:

```javascript
window.embedded_svc.settings = {
  displayHelpButton: true,
  language: 'en',
  defaultMinimizedText: 'Chat with us',
  disabledMinimizedText: 'Agent Offline',
  // ... more settings
};
```

## 🎨 Styling

The application uses custom CSS with a modern gradient design. You can modify the styles in `src/styles.css` to match your brand:

- Color scheme
- Typography
- Layout
- Chat button appearance
- Animations

## 🚀 Deployment

### Option 1: Static Hosting

Deploy the `build/` folder to any static hosting service:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository and deploy
- **AWS S3**: Upload to an S3 bucket with static hosting enabled
- **GitHub Pages**: Push the `build` folder to a `gh-pages` branch
- **Render**: Set publish directory to `build`

### Option 2: Web Server

Deploy to any web server (Apache, Nginx, IIS):

1. Build the project: `npm run build`
2. Copy the contents of `build/` to your web server's public directory
3. Configure your web server to serve the files

### Important Notes for Production

- Set `devMode: false` in `src/SalesforceChatBot.js`
- Update `storageDomain` to your production domain
- Ensure CORS settings in Salesforce allow your domain
- Test thoroughly before going live

## 🧪 Testing

### Local Testing

1. Start the development server: `npm start`
2. Open the application in your browser
3. Click the chat button in the bottom-right corner
4. Verify the chat window opens and connects to Salesforce

### Production Testing

1. Build the project: `npm run build`
2. Serve the `build/` folder using a local server:
   ```bash
   npx serve build
   ```
3. Test all functionality in a production-like environment

## 🐛 Troubleshooting

### Chat button doesn't appear
- Check browser console for errors
- Verify Salesforce credentials in `src/SalesforceChatBot.js`
- Ensure Embedded Service is enabled in your Salesforce org
- Check that agents are online and available

### Build errors
- Delete `node_modules/` and run `npm install` again
- Clear webpack cache: `rm -rf build/`
- Check Node.js version: `node --version` (should be v14+)

### Connection issues
- Verify all Salesforce URLs are correct
- Check CORS settings in Salesforce
- Ensure your domain is whitelisted in Salesforce

## 📚 Resources

- [Salesforce Embedded Service Documentation](https://developer.salesforce.com/docs/atlas.en-us.snapins_web_dev.meta/snapins_web_dev/)
- [React Documentation](https://react.dev/)
- [Webpack Documentation](https://webpack.js.org/)

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Support

For issues related to:
- **This demo app**: Check the troubleshooting section above
- **Salesforce configuration**: Consult `SALESFORCE_SETUP.md` or Salesforce documentation
- **React/Webpack**: Refer to their official documentation

## 🎉 Getting Started Checklist

- [ ] Install Node.js and npm
- [ ] Run `npm install`
- [ ] Configure Salesforce credentials in `src/SalesforceChatBot.js`
- [ ] Review `SALESFORCE_SETUP.md` for detailed setup
- [ ] Run `npm start` to test locally
- [ ] Customize styles and branding as needed
- [ ] Build for production with `npm run build`
- [ ] Deploy to your hosting platform
- [ ] Test in production environment

---

**Ready to get started?** Run `npm install` and then `npm start` to see your chat bot in action! 🚀


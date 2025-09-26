# Gmail + Perplexity Integration

A professional-grade automation system that seamlessly integrates Gmail with Perplexity AI for intelligent email summarization. Built with enterprise-ready architecture using Hammerspoon (macOS) and Google Apps Script, designed for scalability and maintainability.

## 🚀 Features

- **One-click email summarization** via customizable global hotkey
- **Beautiful glassmorphic UI** for selecting personal or work emails
- **Automatic Perplexity integration** - opens new chat and pastes content
- **Smart email filtering** - fetches top 20 unread emails
- **Clean text formatting** - optimized for AI processing
- **Multi-account support** - unlimited email accounts (personal, work, client, newsletter, etc.)
- **Enterprise-ready architecture** - scalable and maintainable codebase

## 📋 Prerequisites

- **macOS** (for Hammerspoon)
- **Hammerspoon** installed ([download here](https://www.hammerspoon.org/))
- **Google account** with Gmail access
- **Perplexity AI** account and app installed
- **Google Apps Script** access

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/gmail-perplexity-integration.git
cd gmail-perplexity-integration
```

### Step 2: Set Up Google Apps Script

#### For Each Email Account:
1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project for each email account
3. Choose the appropriate script:
   - **Personal/Work**: Use `src/apps-script/personal-gmail-summarizer.js` or `src/apps-script/work-gmail-summarizer.js`
   - **Additional accounts**: Use `src/apps-script/template-gmail-summarizer.js` and customize it
4. Save the project with a descriptive name (e.g., "Personal Gmail Summarizer")
5. Deploy as web app:
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as type
   - Set execute permissions to "Anyone"
   - Copy the web app URL

#### Adding More Email Accounts:
1. Copy `src/apps-script/template-gmail-summarizer.js`
2. Customize the `ACCOUNT_CONFIG` section with your account details
3. Create a new Google Apps Script project
4. Paste the customized code
5. Deploy and get the web app URL
6. Add the new account to your Hammerspoon configuration

### Step 3: Configure Hammerspoon

1. Open Hammerspoon
2. Click "Open Config" to open the configuration directory
3. Copy `src/hammerspoon/automation.lua` to your Hammerspoon config directory
4. Edit the email accounts configuration in the script:

```lua
local emailAccounts = {
    {
        id = "personal",
        name = "Personal Mail",
        description = "Summarize top 20 unread from personal inbox",
        url = "YOUR_PERSONAL_APPS_SCRIPT_URL_HERE",
        badge = "Personal"
    },
    {
        id = "work",
        name = "Work Mail",
        description = "Summarize top 20 unread from work inbox",
        url = "YOUR_WORK_APPS_SCRIPT_URL_HERE",
        badge = "Work"
    },
    -- Add more accounts here as needed
    -- {
    --     id = "client",
    --     name = "Client Mail",
    --     description = "Summarize top 20 unread from client inbox",
    --     url = "YOUR_CLIENT_APPS_SCRIPT_URL_HERE",
    --     badge = "Client"
    -- }
}
```

5. **Customize your hotkey** (optional):
   ```lua
   -- Default: Ctrl+Option+Cmd+Y
   mod.hyper = {"ctrl","alt","cmd"}
   mod.key = "y"
   
   -- Example alternatives:
   -- Simple: Cmd+Shift+Y
   mod.hyper = {"cmd","shift"}
   mod.key = "y"
   
   -- Function key: F12
   mod.hyper = {}
   mod.key = "f12"
   
   -- Custom combination: Ctrl+Shift+P
   mod.hyper = {"ctrl","shift"}
   mod.key = "p"
   ```

6. Reload Hammerspoon configuration

### Step 4: Test the Setup

1. Press your configured hotkey (default: `Ctrl+Option+Cmd+Y`) to open the email selector
2. Choose "Personal Mail" or "Work Mail"
3. Verify that:
   - Emails are fetched successfully
   - Perplexity opens with the content
   - The content is properly formatted

## 📁 Project Structure

```
gmail-perplexity-integration/
├── README.md                           # This file
├── LICENSE                             # MIT License
├── .gitignore                          # Git ignore rules
├── src/
│   ├── hammerspoon/
│   │   └── automation.lua              # Main Hammerspoon automation script
│   └── apps-script/
│       ├── personal-gmail-summarizer.js # Personal email handler
│       └── work-gmail-summarizer.js    # Work email handler
├── docs/
│   ├── setup-guide.md                  # Detailed setup instructions
│   └── troubleshooting.md              # Common issues and solutions
├── examples/
│   └── output.txt                      # Sample output format
└── .github/
    └── workflows/
        └── lint.yml                    # GitHub Actions for code quality
```

## 🎯 Usage

### Global Hotkey
- **Customizable hotkey** (default: `Ctrl+Option+Cmd+Y`) - Opens the email selector interface
- **Easy customization** - Modify the hotkey in the configuration file

### Interface Options
- **Dynamic account selection** - UI automatically adapts to your configured email accounts
- **Unlimited accounts** - Add as many email accounts as needed (personal, work, client, newsletter, etc.)
- **Customizable display** - Each account can have custom names, descriptions, and badges

### What Happens Next
1. Script fetches your top 20 unread emails
2. Formats them for AI processing
3. Opens Perplexity AI
4. Creates a new chat
5. Pastes the formatted email content
6. Sends the content for summarization

## ⚙️ Configuration

### Customizing Email Count
Edit the `maxEmails` variable in the Apps Script files:

```javascript
const maxEmails = 20; // Change this number
```

### Modifying Hotkey
Edit the hotkey in `automation.lua`:

```lua
-- Default configuration
mod.hyper = {"ctrl","alt","cmd"}  -- Modifier keys
mod.key = "y"                     -- Main key

-- Popular alternatives:
-- Simple: Cmd+Shift+Y
mod.hyper = {"cmd","shift"}
mod.key = "y"

-- Function key: F12
mod.hyper = {}
mod.key = "f12"

-- Custom: Ctrl+Shift+P
mod.hyper = {"ctrl","shift"}
mod.key = "p"
```

**Available modifier keys:** `"ctrl"`, `"alt"`, `"cmd"`, `"shift"`
**Available keys:** Any letter, number, or function key (e.g., `"f12"`, `"space"`, `"return"`)

### Adding Multiple Email Accounts

To add more email accounts:

1. **Create additional Apps Script projects** using the template
2. **Add new account configurations** to the `emailAccounts` table in the Hammerspoon script
3. **The UI automatically adapts** to show all configured accounts
4. **No code changes needed** - just configuration updates

Example adding a client account:
```lua
-- Add this to your emailAccounts table
{
    id = "client",
    name = "Client Mail",
    description = "Summarize top 20 unread from client inbox",
    url = "YOUR_CLIENT_APPS_SCRIPT_URL_HERE",
    badge = "Client"
}
```

### Changing Output Format
Modify the `formatEmailsForAI()` function in the Apps Script files to customize how emails are formatted for AI processing.

## 🔧 Troubleshooting

### Common Issues

**Hammerspoon not responding to hotkey:**
- Check if Hammerspoon is running
- Verify the configuration is loaded
- Check for syntax errors in the Lua script

**Apps Script returning errors:**
- Ensure Gmail API is enabled
- Check that the script has proper permissions
- Verify the web app deployment settings

**Perplexity not opening:**
- Ensure Perplexity app is installed
- Check if the app name/bundle ID is correct
- Try manually opening Perplexity first

**No emails being fetched:**
- Verify Gmail access permissions
- Check if there are actually unread emails
- Review the search query in the Apps Script

### Getting Help

1. Check the [troubleshooting guide](docs/troubleshooting.md)
2. Review the [setup guide](docs/setup-guide.md)
3. Open an issue on GitHub
4. Check the Hammerspoon console for error messages

## 🔒 Security & Privacy

- **Zero data persistence**: Emails are processed in memory only, never stored
- **Direct API integration**: No third-party intermediaries or data collection
- **Local execution**: All automation runs securely on your local machine
- **Enterprise-grade security**: Uses official Google and Perplexity APIs with proper authentication
- **Privacy-first design**: No telemetry, logging, or data transmission to external services
- **Configurable permissions**: Granular control over Gmail access and data processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hammerspoon](https://www.hammerspoon.org/) - macOS automation framework
- [Google Apps Script](https://script.google.com/) - Gmail API integration
- [Perplexity AI](https://www.perplexity.ai/) - AI-powered email summarization

## 📞 Support

### Enterprise Support
For enterprise deployments, custom integrations, or commercial licensing inquiries, please contact us through GitHub Issues with the "enterprise" label.

### Community Support
- ⭐ **Star the repository** to show your support
- 🐛 **Report bugs** with detailed reproduction steps
- 💡 **Suggest features** through GitHub Issues
- 📖 **Read documentation** for comprehensive guides
- 💬 **Join discussions** in GitHub Discussions

### Professional Services
This project is designed with enterprise scalability in mind. For organizations requiring:
- Custom integrations with existing systems
- Advanced security configurations
- Multi-tenant deployments
- Professional support and maintenance

Please reach out through GitHub Issues with detailed requirements.

---

**Built with enterprise-grade architecture for professional productivity**

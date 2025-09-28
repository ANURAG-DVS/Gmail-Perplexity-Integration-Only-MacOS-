# Gmail + Perplexity Integration

A powerful automation system that fetches your unread Gmail emails and sends them to Perplexity AI for intelligent summarization. Built with Hammerspoon (macOS) and Google Apps Script.

## 🚀 Features

- **One-click email summarization** via global hotkey (`Ctrl+Option+Cmd+Y`)
- **Beautiful glassmorphic UI** for selecting personal or work emails
- **Automatic Perplexity integration** - opens new chat and pastes content
- **Smart email filtering** - fetches top 20 unread emails
- **Clean text formatting** - optimized for AI processing
- **Dual account support** - separate personal and work email handling

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

#### For Personal Emails:
1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the contents of `src/apps-script/personal-gmail-summarizer.js`
4. Save the project (e.g., "Personal Gmail Summarizer")
5. Deploy as web app:
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as type
   - Set execute permissions to "Anyone"
   - Copy the web app URL

#### For Work Emails:
1. Repeat the above steps using `src/apps-script/work-gmail-summarizer.js`
2. Name it "Work Gmail Summarizer"
3. Deploy and copy the web app URL

### Step 3: Configure Hammerspoon

1. Open Hammerspoon
2. Click "Open Config" to open the configuration directory
3. Copy `src/hammerspoon/automation.lua` to your Hammerspoon config directory
4. Edit the URLs in the script:

```lua
local urls = {
    personal = "YOUR_PERSONAL_APPS_SCRIPT_URL_HERE",
    work = "YOUR_WORK_APPS_SCRIPT_URL_HERE",
}
```

5. Reload Hammerspoon configuration

### Step 4: Test the Setup

1. Press `Ctrl+Option+Cmd+Y` to open the email selector
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
- **`Ctrl+Option+Cmd+Y`** - Opens the email selector interface

### Interface Options
- **Personal Mail** - Fetches and summarizes personal Gmail inbox
- **Work Mail** - Fetches and summarizes work Gmail inbox

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
mod.hyper = {"ctrl","alt","cmd"}  -- Modifier keys
mod.key = "y"                     -- Main key
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

- **No data storage**: Emails are processed in memory only
- **Direct integration**: No third-party services store your data
- **Local processing**: All automation runs on your machine
- **Secure APIs**: Uses official Google and Perplexity APIs

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

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

**Made with ❤️ for productivity enthusiasts**

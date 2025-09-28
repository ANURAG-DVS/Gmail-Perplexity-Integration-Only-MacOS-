# Gmail + Perplexity Integration

**Turn your Gmail emails into AI summaries with one click!**

This tool automatically fetches your unread emails and sends them to Perplexity AI for smart summarization. Perfect for busy people who want to quickly understand their email without reading everything.

## 🎯 What This Does

1. **Press a hotkey** → Opens a beautiful email selector
2. **Choose your email account** → Personal, Work, or any other account
3. **Get AI summary** → Perplexity automatically opens and summarizes your emails

## 📋 What You Need

- **Mac computer** (this only works on Mac)
- **Gmail account** (or multiple accounts)
- **Perplexity AI account** (free or paid)
- **10 minutes** to set everything up

## 🚀 Step-by-Step Setup

### Step 1: Download and Install Hammerspoon

1. Go to [hammerspoon.org](https://www.hammerspoon.org/)
2. Click "Download Hammerspoon"
3. Install it like any other Mac app
4. Open Hammerspoon (it will appear in your menu bar)

### Step 2: Download This Project

1. Click the green "Code" button on this page
2. Click "Download ZIP"
3. Extract the ZIP file to your Desktop
4. Rename the folder to "Gmail + Perplexity"

### Step 3: Set Up Your Email Accounts

#### For Each Email Account (Personal, Work, etc.):

1. **Go to Google Apps Script:**
   - Open [script.google.com](https://script.google.com/)
   - Sign in with your Google account

2. **Create a New Project:**
   - Click "New Project"
   - Delete all the code in the editor
   - Copy the code from `src/apps-script/personal-gmail-summarizer.js` (or `work-gmail-summarizer.js`)
   - Paste it into the editor

3. **Save and Deploy:**
   - Click "Save" (Ctrl+S)
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - **Copy the web app URL** (you'll need this!)

4. **Repeat for each email account** you want to use

### Step 4: Configure the Tool

1. **Open the project folder** on your Desktop
2. **Copy the example config:**
   - Find `src/hammerspoon/config.example.lua`
   - Copy it
   - Paste it in the main folder
   - Rename it to `config.local.lua`

3. **Edit your config:**
   - Open `config.local.lua` in any text editor
   - Replace `YOUR_PERSONAL_APPS_SCRIPT_URL_HERE` with your actual URL from Step 3
   - Replace `YOUR_WORK_APPS_SCRIPT_URL_HERE` with your work URL
   - Save the file

### Step 5: Connect to Hammerspoon

1. **Open Hammerspoon** (click the menu bar icon)
2. **Click "Open Config"**
3. **Replace everything** in the config file with this code:

```lua
-- Load the Gmail + Perplexity automation
require("path.to.your.project.src.hammerspoon.automation")
```

**Important:** Replace `path.to.your.project` with the actual path to your project folder.

**Example:** If your project is on Desktop, use:
```lua
require("/Users/YourName/Desktop/Gmail + Perplexity/src/hammerspoon/automation")
```

4. **Save the file** (Ctrl+S)
5. **Reload Hammerspoon** (click the menu bar icon → "Reload Config")

### Step 6: Test It!

1. **Press `Option + Command + G`** on your keyboard
2. **You should see** a beautiful email selector window
3. **Click on an email account** (Personal or Work)
4. **Wait a few seconds** - Perplexity should open with your email summary!

## 🎮 How to Use

1. **Press `Option + Command + G`** anytime
2. **Choose your email account** from the beautiful selector
3. **Wait for the magic** - your emails get summarized automatically!

## 🔧 Troubleshooting

### "Nothing happens when I press the hotkey"
- Make sure Hammerspoon is running (check menu bar)
- Try reloading the config in Hammerspoon
- Check that the file path in your Hammerspoon config is correct

### "Error loading config"
- Make sure you created `config.local.lua` in the main project folder
- Check that your Apps Script URLs are correct
- Make sure you deployed your Apps Script as a web app

### "Perplexity doesn't open"
- Make sure Perplexity is installed on your Mac
- Try opening Perplexity manually first
- Check that you're signed in to Perplexity

### "No emails are fetched"
- Check your Apps Script URLs in `config.local.lua`
- Make sure your Apps Script is deployed as "Anyone" can access
- Try running your Apps Script manually in Google Apps Script

## 📁 File Structure

```
Gmail + Perplexity/
├── README.md                           # This file
├── config.local.lua                    # Your personal settings (DON'T share this!)
├── src/
│   ├── hammerspoon/
│   │   ├── automation.lua              # Main automation code
│   │   └── config.example.lua          # Template for your config
│   └── apps-script/
│       ├── personal-gmail-summarizer.js    # For personal emails
│       ├── work-gmail-summarizer.js        # For work emails
│       └── template-gmail-summarizer.js    # For other accounts
└── docs/                               # Extra documentation
```

## 🔒 Privacy & Security

- **Your emails stay private** - they're only processed by Google Apps Script and Perplexity
- **No data is stored** - everything is processed in real-time
- **Your config is local** - `config.local.lua` stays on your computer
- **Open source** - you can see exactly what the code does

## 🆘 Need Help?

1. **Check the troubleshooting section** above
2. **Look at the docs folder** for more detailed guides
3. **Open an issue** on GitHub if you're still stuck

## 🎉 You're Done!

Congratulations! You now have a powerful email summarization tool that works with just one keypress. Enjoy your newfound productivity! 🚀

---

**Made with ❤️ for busy people who love efficiency**
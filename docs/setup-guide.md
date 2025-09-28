# Detailed Setup Guide

This guide provides step-by-step instructions for setting up the Gmail + Perplexity integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Apps Script Setup](#google-apps-script-setup)
3. [Hammerspoon Configuration](#hammerspoon-configuration)
4. [Testing the Setup](#testing-the-setup)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

1. **macOS** (tested on macOS 12+)
2. **Hammerspoon** - Download from [hammerspoon.org](https://www.hammerspoon.org/)
3. **Perplexity AI** - Download from [perplexity.ai](https://www.perplexity.ai/) or Mac App Store
4. **Google Account** with Gmail access

### Required Accounts

- Google account with Gmail
- Perplexity AI account
- GitHub account (for cloning the repository)

## Google Apps Script Setup

### Step 1: Create Personal Email Script

1. Go to [script.google.com](https://script.google.com/)
2. Click "New Project"
3. Delete the default `myFunction` code
4. Copy the entire contents of `src/apps-script/personal-gmail-summarizer.js`
5. Paste it into the script editor
6. Save the project (Ctrl+S or Cmd+S)
7. Name it "Personal Gmail Summarizer"

### Step 2: Deploy Personal Script

1. Click the "Deploy" button
2. Select "New deployment"
3. Click the gear icon next to "Type" and select "Web app"
4. Set the following options:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click "Deploy"
6. **Copy the web app URL** - you'll need this for the Hammerspoon configuration

### Step 3: Create Work Email Script

1. Create another new project in Google Apps Script
2. Copy the contents of `src/apps-script/work-gmail-summarizer.js`
3. Paste it into the script editor
4. Save and name it "Work Gmail Summarizer"
5. Deploy it following the same steps as above
6. **Copy the web app URL** for this script too

### Step 4: Test the Scripts

1. In each script, click the "Run" button next to `testScript`
2. Grant permissions when prompted
3. Check the execution log for any errors
4. Verify that the test completes successfully

## Hammerspoon Configuration

### Step 1: Install Hammerspoon

1. Download from [hammerspoon.org](https://www.hammerspoon.org/)
2. Install the application
3. Launch Hammerspoon
4. Grant accessibility permissions when prompted

### Step 2: Configure the Script

1. In Hammerspoon, click "Open Config"
2. This opens the `~/.hammerspoon/` directory
3. Copy `src/hammerspoon/automation.lua` to this directory
4. Open the file in a text editor

### Step 3: Update URLs

Replace the placeholder URLs in the script:

```lua
local urls = {
    personal = "https://script.google.com/macros/s/YOUR_PERSONAL_SCRIPT_ID/exec",
    work = "https://script.google.com/macros/s/YOUR_WORK_SCRIPT_ID/exec",
}
```

### Step 4: Customize Settings (Optional)

You can modify these settings in the script:

```lua
-- Change the hotkey combination
mod.hyper = {"alt","cmd"}         -- Modifier keys
mod.key = "g"                     -- Main key

-- Change the project path (if needed)
local projectPath = "/Users/yourusername/Documents/Gmail + Perplexity"
```

### Step 5: Reload Configuration

1. In Hammerspoon, click "Reload Config"
2. Check the console for any error messages
3. The hotkey should now be active

## Testing the Setup

### Test 1: Basic Functionality

1. Press `Ctrl+Option+Cmd+Y`
2. You should see the email selector interface
3. Try selecting "Personal Mail"
4. Check if Perplexity opens with the email content

### Test 2: Email Fetching

1. Ensure you have some unread emails in your Gmail
2. Run the test again
3. Verify that emails are being fetched and formatted correctly

### Test 3: Error Handling

1. Try running the script with no internet connection
2. Check that appropriate error messages are shown
3. Test with an empty inbox

## Troubleshooting

### Common Issues

#### Hammerspoon Not Responding

**Symptoms:**
- Hotkey doesn't work
- No interface appears

**Solutions:**
1. Check if Hammerspoon is running (look for the menu bar icon)
2. Verify the configuration is loaded (check console)
3. Look for syntax errors in the Lua script
4. Try restarting Hammerspoon

#### Apps Script Errors

**Symptoms:**
- "Fetch failed" notification
- Empty or error responses

**Solutions:**
1. Check the Apps Script execution log
2. Verify Gmail API permissions
3. Ensure the web app is deployed correctly
4. Test the script manually in Apps Script editor

#### Perplexity Not Opening

**Symptoms:**
- Emails fetch successfully but Perplexity doesn't open
- Error messages about app not found

**Solutions:**
1. Ensure Perplexity is installed
2. Try opening Perplexity manually first
3. Check the app name in the script (should be "Perplexity")
4. Verify the bundle ID if needed

#### No Emails Being Fetched

**Symptoms:**
- Script runs but shows "No unread emails"
- Empty output

**Solutions:**
1. Check if you actually have unread emails
2. Verify Gmail permissions in Apps Script
3. Test the search query manually
4. Check for email filters or labels

### Debug Mode

To enable debug mode, add this to the top of your Hammerspoon script:

```lua
-- Enable debug mode
hs.logger.setGlobalLogLevel('debug')
```

This will provide more detailed logging in the Hammerspoon console.

### Getting Help

1. Check the Hammerspoon console for error messages
2. Review the Apps Script execution log
3. Test each component individually
4. Open an issue on GitHub with detailed error information

## Advanced Configuration

### Custom Email Filters

You can modify the email search query in the Apps Script files:

```javascript
// Example: Only fetch emails from specific senders
const threads = GmailApp.search('in:inbox is:unread from:important@company.com', 0, maxEmails);

// Example: Exclude promotional emails
const threads = GmailApp.search('in:inbox is:unread -category:promotions', 0, maxEmails);
```

### Custom Output Format

Modify the `formatEmailsForAI()` function to change how emails are formatted:

```javascript
function formatEmailsForAI(emails) {
  // Your custom formatting logic here
  return customFormattedOutput;
}
```

### Multiple Email Accounts

To add more email accounts:

1. Create additional Apps Script projects
2. Add new URLs to the `urls` table in the Hammerspoon script
3. Update the interface to include new options

## Security Considerations

- **Web App Permissions**: Only deploy with "Anyone" access if you're comfortable with the security implications
- **API Keys**: The scripts use your Google account's built-in permissions
- **Data Privacy**: Emails are processed in memory and not stored permanently
- **Network Security**: All communication uses HTTPS

## Performance Optimization

- **Email Limit**: The default limit of 20 emails balances functionality with performance
- **Text Truncation**: Email bodies are limited to 1000 characters to prevent overwhelming the AI
- **Caching**: Consider implementing caching for frequently accessed emails
- **Rate Limiting**: Be mindful of Gmail API rate limits for high-volume usage

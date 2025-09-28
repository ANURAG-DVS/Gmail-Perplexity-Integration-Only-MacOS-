# Troubleshooting Guide

This guide helps you diagnose and fix common issues with the Gmail + Perplexity integration.

## Quick Diagnostics

### Check System Status

Run these commands in Terminal to check your system:

```bash
# Check if Hammerspoon is running
ps aux | grep -i hammerspoon

# Check if Perplexity is installed
ls /Applications/ | grep -i perplexity

# Check network connectivity
ping -c 3 script.google.com
```

## Common Issues & Solutions

### 1. Hammerspoon Issues

#### Hotkey Not Working

**Symptoms:**
- Pressing `Ctrl+Option+Cmd+Y` does nothing
- No interface appears

**Diagnosis:**
1. Check if Hammerspoon is running (look for menu bar icon)
2. Open Hammerspoon console and look for errors
3. Verify the configuration is loaded

**Solutions:**
```bash
# Restart Hammerspoon
killall Hammerspoon
open -a Hammerspoon

# Check configuration syntax
lua -c ~/.hammerspoon/automation.lua
```

**Prevention:**
- Always test configuration after changes
- Keep Hammerspoon updated
- Check console regularly for warnings

#### Configuration Not Loading

**Symptoms:**
- "Configuration loaded" message doesn't appear
- Script errors in console

**Solutions:**
1. Check for syntax errors in the Lua script
2. Verify file permissions
3. Ensure all required modules are available

```lua
-- Add this to the top of your script for debugging
hs.logger.setGlobalLogLevel('debug')
```

#### Permission Issues

**Symptoms:**
- "Accessibility permissions required" message
- Script runs but doesn't control other apps

**Solutions:**
1. Go to System Preferences → Security & Privacy → Privacy
2. Select "Accessibility" from the left sidebar
3. Add Hammerspoon to the list
4. Restart Hammerspoon

### 2. Google Apps Script Issues

#### Script Execution Errors

**Symptoms:**
- "Fetch failed" notifications
- HTTP error responses
- Empty output

**Diagnosis:**
1. Check the Apps Script execution log
2. Test the script manually in the editor
3. Verify Gmail API permissions

**Solutions:**

**Permission Issues:**
1. In Apps Script editor, click "Review permissions"
2. Grant all requested permissions
3. Re-run the script

**API Quota Exceeded:**
```javascript
// Add error handling for quota issues
function doGet() {
  try {
    // Your existing code
  } catch (error) {
    if (error.toString().includes('quota')) {
      return ContentService
        .createTextOutput('API quota exceeded. Please try again later.')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    throw error;
  }
}
```

**Gmail Access Issues:**
1. Ensure you're logged into the correct Google account
2. Check if Gmail is enabled for your account
3. Verify the script has Gmail API access

#### Web App Deployment Issues

**Symptoms:**
- 404 errors when accessing the web app URL
- "Script not found" errors

**Solutions:**
1. Re-deploy the web app
2. Check the deployment settings:
   - Execute as: "Me"
   - Who has access: "Anyone"
3. Copy the correct web app URL (not the script URL)

### 3. Perplexity Integration Issues

#### App Not Opening

**Symptoms:**
- Emails fetch successfully
- Perplexity doesn't launch
- "Application not found" errors

**Solutions:**

**Check App Installation:**
```bash
# Find Perplexity installation
find /Applications -name "*erplexity*" -type d
```

**Update App Name in Script:**
```lua
-- Try different app names
local launched = hs.application.launchOrFocus("Perplexity")
if not launched then
    hs.application.launchOrFocus("Perplexity AI")
end
```

**Bundle ID Method:**
```lua
-- Use bundle ID instead of app name
hs.application.launchOrFocusByBundleID("ai.perplexity.mac")
```

#### Content Not Pasting

**Symptoms:**
- Perplexity opens but content isn't pasted
- Clipboard issues

**Solutions:**
1. Check clipboard permissions
2. Add delays for slower systems:

```lua
-- Increase delays for slower systems
hs.timer.doAfter(1.0, function()  -- Increased from 0.6
    hs.eventtap.keyStroke({"cmd"}, "n", 0)
    hs.timer.doAfter(0.5, function()  -- Increased from 0.2
        hs.eventtap.keyStroke({"cmd"}, "v", 0)
    end)
end)
```

### 4. Network & Connectivity Issues

#### API Timeout Errors

**Symptoms:**
- "Request timeout" errors
- Slow response times

**Solutions:**
```lua
-- Add timeout handling
hs.http.asyncGet(url, {timeout = 30}, function(status, body, headers)
    if status == -1 then
        notify("Network Error", "Request timed out")
        return
    end
    -- Handle response
end)
```

#### SSL Certificate Issues

**Symptoms:**
- SSL verification errors
- Certificate warnings

**Solutions:**
1. Update your system certificates
2. Check system date/time
3. Try accessing the Apps Script URL directly in browser

### 5. Email Processing Issues

#### No Emails Found

**Symptoms:**
- "No unread emails" message
- Empty inbox when emails exist

**Diagnosis:**
1. Check if emails are actually unread
2. Verify Gmail search query
3. Check for email filters

**Solutions:**

**Debug Email Search:**
```javascript
function testEmailSearch() {
  const threads = GmailApp.search('in:inbox is:unread', 0, 5);
  console.log('Found threads:', threads.length);
  
  threads.forEach(thread => {
    const messages = thread.getMessages();
    console.log('Thread has', messages.length, 'messages');
  });
}
```

**Check Email Labels:**
```javascript
// Search in specific labels
const threads = GmailApp.search('in:inbox is:unread label:important', 0, 20);
```

#### Malformed Email Content

**Symptoms:**
- Garbled text in output
- Missing email content
- Encoding issues

**Solutions:**
```javascript
function extractTextFromMessage(message) {
  try {
    let body = message.getPlainBody();
    
    // Better text cleaning
    body = body
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[^\x00-\x7F]/g, '')  // Remove non-ASCII
      .replace(/\s+/g, ' ')          // Normalize whitespace
      .trim();
    
    return body;
  } catch (error) {
    return message.getSnippet() || 'Content extraction failed';
  }
}
```

## Advanced Debugging

### Enable Debug Logging

**Hammerspoon:**
```lua
-- Add to top of script
hs.logger.setGlobalLogLevel('debug')
hs.console.clearConsole()
```

**Apps Script:**
```javascript
// Add detailed logging
function doGet() {
  console.log('Script started at:', new Date());
  
  try {
    const emails = getUnreadEmails('personal');
    console.log('Found emails:', emails.length);
    
    // Your existing code
  } catch (error) {
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
  }
}
```

### Performance Monitoring

**Monitor Script Performance:**
```javascript
function doGet() {
  const startTime = new Date();
  
  try {
    // Your code here
    const endTime = new Date();
    console.log('Execution time:', endTime - startTime, 'ms');
  } catch (error) {
    console.error('Error after', new Date() - startTime, 'ms');
  }
}
```

### Network Debugging

**Test API Endpoints:**
```bash
# Test Apps Script URL
curl -v "YOUR_APPS_SCRIPT_URL"

# Check response headers
curl -I "YOUR_APPS_SCRIPT_URL"
```

## Getting Help

### Before Asking for Help

1. **Check the logs** - Both Hammerspoon console and Apps Script execution log
2. **Test components individually** - Verify each part works in isolation
3. **Check system requirements** - Ensure all prerequisites are met
4. **Try basic troubleshooting** - Restart applications, check permissions

### When Reporting Issues

Include the following information:

1. **System Information:**
   - macOS version
   - Hammerspoon version
   - Perplexity version

2. **Error Messages:**
   - Exact error text
   - When the error occurs
   - Steps to reproduce

3. **Logs:**
   - Hammerspoon console output
   - Apps Script execution log
   - Any relevant system logs

4. **Configuration:**
   - Your current script configuration (remove sensitive URLs)
   - Any custom modifications made

### Useful Resources

- [Hammerspoon Documentation](http://www.hammerspoon.org/docs/)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Gmail API Reference](https://developers.google.com/gmail/api)
- [Perplexity AI Support](https://www.perplexity.ai/help)

## Prevention Tips

1. **Regular Updates:** Keep all software updated
2. **Backup Configuration:** Save working configurations
3. **Test Changes:** Always test modifications in a safe environment
4. **Monitor Logs:** Check logs regularly for warnings
5. **Document Changes:** Keep track of custom modifications

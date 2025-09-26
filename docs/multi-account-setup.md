# Multi-Account Setup Guide

This guide explains how to configure multiple email accounts with the Gmail + Perplexity Integration system.

## Overview

The system supports unlimited email accounts, each with its own:
- Google Apps Script deployment
- Custom configuration
- Display settings
- Email processing rules

## Quick Start

### 1. Basic Setup (Personal + Work)

For the standard two-account setup:

1. **Personal Account**:
   - Use `src/apps-script/personal-gmail-summarizer.js`
   - Deploy as "Personal Gmail Summarizer"

2. **Work Account**:
   - Use `src/apps-script/work-gmail-summarizer.js`
   - Deploy as "Work Gmail Summarizer"

3. **Configure Hammerspoon**:
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
       }
   }
   ```

### 2. Adding Additional Accounts

For each additional account:

1. **Create Apps Script Project**:
   - Copy `src/apps-script/template-gmail-summarizer.js`
   - Customize the `ACCOUNT_CONFIG` section
   - Deploy as web app

2. **Add to Hammerspoon Configuration**:
   ```lua
   -- Add to your emailAccounts table
   {
       id = "client",
       name = "Client Mail",
       description = "Summarize top 20 unread from client inbox",
       url = "YOUR_CLIENT_APPS_SCRIPT_URL_HERE",
       badge = "Client"
   }
   ```

## Account Configuration Options

### Basic Configuration

Each account requires these fields:

```lua
{
    id = "unique_identifier",        -- Used internally, must be unique
    name = "Display Name",           -- Shown in the UI
    description = "Description",     -- Shown under the name
    url = "APPS_SCRIPT_URL",         -- Deployed web app URL
    badge = "Badge Text"             -- Small badge in top-right of card
}
```

### Advanced Configuration (Apps Script)

For advanced customization, modify the `ACCOUNT_CONFIG` in your Apps Script:

```javascript
const ACCOUNT_CONFIG = {
    id: "client",
    name: "Client Mail",
    description: "Summarize top 20 unread from client inbox",
    maxEmails: 15,                    // Custom email limit
    customSearchQuery: "in:inbox is:unread from:clients@company.com", // Custom search
    customFormatting: {
        prefix: "🏢",                 // Custom emoji/prefix
        summaryPrompt: "Summarize client emails and highlight urgent requests."
    }
};
```

## Common Account Types

### 1. Client Account
```lua
{
    id = "client",
    name = "Client Mail",
    description = "Summarize top 20 unread from client inbox",
    url = "YOUR_CLIENT_APPS_SCRIPT_URL_HERE",
    badge = "Client"
}
```

**Apps Script Configuration**:
```javascript
const ACCOUNT_CONFIG = {
    id: "client",
    name: "Client Mail",
    description: "Summarize top 20 unread from client inbox",
    maxEmails: 15,
    customSearchQuery: "in:inbox is:unread from:clients@company.com",
    customFormatting: {
        prefix: "🏢",
        summaryPrompt: "Summarize client emails and highlight urgent requests and deadlines."
    }
};
```

### 2. Newsletter Account
```lua
{
    id = "newsletter",
    name = "Newsletter Mail",
    description = "Summarize top 20 unread from newsletter inbox",
    url = "YOUR_NEWSLETTER_APPS_SCRIPT_URL_HERE",
    badge = "News"
}
```

**Apps Script Configuration**:
```javascript
const ACCOUNT_CONFIG = {
    id: "newsletter",
    name: "Newsletter Mail",
    description: "Summarize top 20 unread from newsletter inbox",
    maxEmails: 10,
    customSearchQuery: "in:inbox is:unread category:promotions",
    customFormatting: {
        prefix: "📰",
        summaryPrompt: "Summarize newsletters and highlight interesting articles and resources."
    }
};
```

### 3. Side Project Account
```lua
{
    id = "sideproject",
    name = "Side Project Mail",
    description = "Summarize top 20 unread from side project inbox",
    url = "YOUR_SIDEPROJECT_APPS_SCRIPT_URL_HERE",
    badge = "Project"
}
```

**Apps Script Configuration**:
```javascript
const ACCOUNT_CONFIG = {
    id: "sideproject",
    name: "Side Project Mail",
    description: "Summarize top 20 unread from side project inbox",
    maxEmails: 25,
    customFormatting: {
        prefix: "💼",
        summaryPrompt: "Summarize side project emails and highlight opportunities and action items."
    }
};
```

### 4. Family Account
```lua
{
    id = "family",
    name = "Family Mail",
    description = "Summarize top 20 unread from family inbox",
    url = "YOUR_FAMILY_APPS_SCRIPT_URL_HERE",
    badge = "Family"
}
```

**Apps Script Configuration**:
```javascript
const ACCOUNT_CONFIG = {
    id: "family",
    name: "Family Mail",
    description: "Summarize top 20 unread from family inbox",
    maxEmails: 30,
    customFormatting: {
        prefix: "👨‍👩‍👧‍👦",
        summaryPrompt: "Summarize family emails and highlight important updates and events."
    }
};
```

## UI Behavior with Multiple Accounts

### Dynamic Layout
- **2 accounts**: 2-column grid layout
- **3-4 accounts**: 2-column grid with 2 rows
- **5+ accounts**: Automatically adjusts to fit all accounts
- **Window size**: Scales based on number of accounts

### Navigation
- **Arrow keys**: Navigate between account cards
- **Enter**: Select focused account
- **Escape**: Close the interface
- **Mouse**: Click any account card to select

## Best Practices

### 1. Account Organization
- Use descriptive IDs (e.g., "client", "newsletter", "family")
- Keep names concise but clear
- Use appropriate badges for quick identification

### 2. Email Limits
- **Personal**: 20-30 emails
- **Work**: 15-25 emails
- **Client**: 10-15 emails (usually more important)
- **Newsletter**: 5-10 emails (often less critical)

### 3. Search Queries
- Use specific search queries for focused results
- Filter by sender for client accounts
- Use categories for newsletter accounts
- Consider date ranges for time-sensitive accounts

### 4. Custom Formatting
- Use relevant emojis for visual distinction
- Customize summary prompts for account type
- Consider different email limits per account

## Troubleshooting Multiple Accounts

### Common Issues

**Account not appearing in UI**:
- Check that the account is added to `emailAccounts` table
- Verify the `id` field is unique
- Ensure all required fields are present

**Apps Script not working**:
- Verify the web app URL is correct
- Check that the script is deployed with "Anyone" access
- Test the script manually in Apps Script editor

**UI layout issues**:
- Too many accounts may cause layout problems
- Consider grouping related accounts
- Use shorter names and descriptions

### Performance Considerations

**Too many accounts**:
- Each account makes a separate API call
- Consider batching or limiting total accounts
- Monitor Gmail API quota usage

**Large email volumes**:
- Reduce `maxEmails` for high-volume accounts
- Use more specific search queries
- Consider processing frequency

## Enterprise Multi-Account Setup

### Department-Based Accounts
```lua
{
    id = "engineering",
    name = "Engineering Mail",
    description = "Summarize top 20 unread from engineering inbox",
    url = "YOUR_ENGINEERING_APPS_SCRIPT_URL_HERE",
    badge = "Eng"
},
{
    id = "marketing",
    name = "Marketing Mail",
    description = "Summarize top 20 unread from marketing inbox",
    url = "YOUR_MARKETING_APPS_SCRIPT_URL_HERE",
    badge = "Mkt"
},
{
    id = "sales",
    name = "Sales Mail",
    description = "Summarize top 20 unread from sales inbox",
    url = "YOUR_SALES_APPS_SCRIPT_URL_HERE",
    badge = "Sales"
}
```

### Project-Based Accounts
```lua
{
    id = "project_alpha",
    name = "Project Alpha Mail",
    description = "Summarize top 20 unread from Project Alpha inbox",
    url = "YOUR_PROJECT_ALPHA_APPS_SCRIPT_URL_HERE",
    badge = "Alpha"
},
{
    id = "project_beta",
    name = "Project Beta Mail",
    description = "Summarize top 20 unread from Project Beta inbox",
    url = "YOUR_PROJECT_BETA_APPS_SCRIPT_URL_HERE",
    badge = "Beta"
}
```

## Migration from Single Account

If you're upgrading from a single-account setup:

1. **Backup your current configuration**
2. **Update the Hammerspoon script** to use the new `emailAccounts` format
3. **Test with existing accounts** first
4. **Add new accounts gradually**
5. **Verify all accounts work** before removing old configuration

## Support

For issues with multiple account setup:
- Check the [troubleshooting guide](troubleshooting.md)
- Review the [setup guide](setup-guide.md)
- Open an issue on GitHub with your configuration details

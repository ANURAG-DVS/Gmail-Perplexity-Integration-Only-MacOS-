/**
 * Gmail + Perplexity Integration - Template Email Summarizer
 * 
 * This is a template Google Apps Script for creating additional email accounts.
 * Copy this file and customize it for each additional email account you want to add.
 * 
 * Setup Instructions:
 * 1. Copy this file to a new name (e.g., "client-gmail-summarizer.js")
 * 2. Create a new Google Apps Script project
 * 3. Paste the customized code into the script editor
 * 4. Update the account configuration section below
 * 5. Deploy as a web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and add it to your Hammerspoon configuration
 * 
 * @author Your Name
 * @version 1.0.0
 */

// ============================================================================
// ACCOUNT CONFIGURATION - CUSTOMIZE THIS SECTION
// ============================================================================

const ACCOUNT_CONFIG = {
    // Unique identifier for this account (used in Hammerspoon config)
    id: "your_account_id", // e.g., "client", "newsletter", "sideproject"
    
    // Display name for the account
    name: "Your Account Name", // e.g., "Client Mail", "Newsletter Mail"
    
    // Description shown in the UI
    description: "Summarize top 20 unread from your account inbox",
    
    // Maximum number of emails to process
    maxEmails: 20,
    
    // Custom email search query (optional)
    // Leave empty to use default: 'in:inbox is:unread'
    customSearchQuery: "", // e.g., "in:inbox is:unread from:important@company.com"
    
    // Custom formatting for this account (optional)
    customFormatting: {
        // Add custom emoji or prefix for this account
        prefix: "📧", // e.g., "🏢", "📰", "💼"
        
        // Custom summary prompt
        summaryPrompt: "Summarize the above email dump and highlight action items and important links."
    }
};

// ============================================================================
// MAIN FUNCTIONS - NO CHANGES NEEDED BELOW THIS LINE
// ============================================================================

/**
 * Main function to fetch and format unread emails
 * This is the entry point called by the web app
 */
function doGet() {
  try {
    // Get unread emails for this account
    const emails = getUnreadEmails(ACCOUNT_CONFIG);
    
    // Format emails for AI summarization
    const formattedOutput = formatEmailsForAI(emails, ACCOUNT_CONFIG);
    
    // Return the formatted content
    return ContentService
      .createTextOutput(formattedOutput)
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Fetches unread emails from Gmail
 * @param {Object} config - Account configuration object
 * @returns {Array} Array of email objects
 */
function getUnreadEmails(config) {
  const maxEmails = config.maxEmails || 20;
  
  try {
    // Use custom search query if provided, otherwise use default
    const searchQuery = config.customSearchQuery || 'in:inbox is:unread';
    
    // Search for unread emails
    const threads = GmailApp.search(searchQuery, 0, maxEmails);
    const emails = [];
    
    threads.forEach(thread => {
      const messages = thread.getMessages();
      messages.forEach(message => {
        // Skip if already read
        if (message.isUnread()) {
          emails.push({
            subject: message.getSubject(),
            from: message.getFrom(),
            date: message.getDate(),
            body: extractTextFromMessage(message),
            snippet: message.getPlainBody().substring(0, 200) + '...',
            threadId: thread.getId()
          });
        }
      });
    });
    
    return emails.slice(0, maxEmails);
    
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw new Error('Failed to fetch emails: ' + error.toString());
  }
}

/**
 * Extracts clean text from email message
 * @param {GmailMessage} message - Gmail message object
 * @returns {string} Clean text content
 */
function extractTextFromMessage(message) {
  try {
    let body = message.getPlainBody();
    
    // Clean up the text
    body = body
      .replace(/\r\n/g, '\n')           // Normalize line endings
      .replace(/\n{3,}/g, '\n\n')       // Remove excessive line breaks
      .replace(/[^\x00-\x7F]/g, '')     // Remove non-ASCII characters
      .trim();
    
    // Limit body length to prevent overwhelming the AI
    if (body.length > 1000) {
      body = body.substring(0, 1000) + '...';
    }
    
    return body;
    
  } catch (error) {
    console.error('Error extracting text:', error);
    return message.getSnippet() || 'Unable to extract content';
  }
}

/**
 * Formats emails for AI summarization
 * @param {Array} emails - Array of email objects
 * @param {Object} config - Account configuration object
 * @returns {string} Formatted string for AI processing
 */
function formatEmailsForAI(emails, config) {
  if (!emails || emails.length === 0) {
    return `## ${config.customFormatting?.prefix || '📧'} No Unread Emails Found\n\nYour ${config.name.toLowerCase()} inbox is clean! 🎉`;
  }
  
  const prefix = config.customFormatting?.prefix || '📧';
  const summaryPrompt = config.customFormatting?.summaryPrompt || 'Summarize the above email dump and highlight action items and important links.';
  
  let output = `## ${prefix} ${config.name} Summary (${emails.length} emails)\n\n`;
  
  emails.forEach((email, index) => {
    output += `### 📬 **${email.subject}**\n`;
    output += `From: ${email.from}\n\n`;
    output += `${email.body}\n\n`;
    
    // Add separator between emails
    if (index < emails.length - 1) {
      output += '---\n\n';
    }
  });
  
  output += `\n> 🤖 ${summaryPrompt}`;
  
  return output;
}

/**
 * Test function to verify the script works
 * Run this in the Apps Script editor to test
 */
function testScript() {
  try {
    console.log('Testing script for account:', ACCOUNT_CONFIG.name);
    
    const emails = getUnreadEmails(ACCOUNT_CONFIG);
    console.log(`Found ${emails.length} unread emails`);
    
    if (emails.length > 0) {
      console.log('Sample email:', emails[0]);
    }
    
    const formatted = formatEmailsForAI(emails, ACCOUNT_CONFIG);
    console.log('Formatted output length:', formatted.length);
    
    return 'Test completed successfully for ' + ACCOUNT_CONFIG.name;
    
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
Example configurations for different account types:

1. Client Account:
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

2. Newsletter Account:
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

3. Side Project Account:
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
*/

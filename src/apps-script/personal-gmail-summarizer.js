/**
 * Gmail + Perplexity Integration - Personal Email Summarizer
 * 
 * This Google Apps Script fetches unread emails from your personal Gmail inbox
 * and formats them for AI summarization via Perplexity.
 * 
 * Setup Instructions:
 * 1. Create a new Google Apps Script project
 * 2. Copy this code into the script editor
 * 3. Deploy as a web app with execute permissions for "Anyone"
 * 4. Copy the web app URL and update the Hammerspoon script
 * 
 * @author Your Name
 * @version 1.0.0
 */

/**
 * Main function to fetch and format unread emails
 * This is the entry point called by the web app
 */
function doGet() {
  try {
    // Get unread emails from personal inbox
    const emails = getUnreadEmails('personal');
    
    // Format emails for AI summarization
    const formattedOutput = formatEmailsForAI(emails);
    
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
 * @param {string} accountType - Type of account (personal/work)
 * @returns {Array} Array of email objects
 */
function getUnreadEmails(accountType) {
  const maxEmails = 20; // Limit to top 20 unread emails
  
  try {
    // Search for unread emails in inbox
    const threads = GmailApp.search('in:inbox is:unread', 0, maxEmails);
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
 * @returns {string} Formatted string for AI processing
 */
function formatEmailsForAI(emails) {
  if (!emails || emails.length === 0) {
    return '## 🔥 No Unread Emails Found\n\nYour inbox is clean! 🎉';
  }
  
  let output = `## 🔥 Unread Email Summary (${emails.length} emails)\n\n`;
  
  emails.forEach((email, index) => {
    output += `### 📬 **${email.subject}**\n`;
    output += `From: ${email.from}\n\n`;
    output += `${email.body}\n\n`;
    
    // Add separator between emails
    if (index < emails.length - 1) {
      output += '---\n\n';
    }
  });
  
  output += '\n> 🤖 Summarize the above email dump and highlight action items and important links.';
  
  return output;
}

/**
 * Test function to verify the script works
 * Run this in the Apps Script editor to test
 */
function testScript() {
  try {
    const emails = getUnreadEmails('personal');
    console.log(`Found ${emails.length} unread emails`);
    
    if (emails.length > 0) {
      console.log('Sample email:', emails[0]);
    }
    
    const formatted = formatEmailsForAI(emails);
    console.log('Formatted output length:', formatted.length);
    
    return 'Test completed successfully';
    
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

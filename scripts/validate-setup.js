#!/usr/bin/env node

/**
 * Setup Validation Script
 * 
 * This script validates that the Gmail + Perplexity integration
 * is properly configured and ready to use.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      log(`✓ ${description}`, 'green');
      return true;
    } else {
      log(`✗ ${description} - File not found: ${filePath}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ ${description} - Error: ${error.message}`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  try {
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      log(`✓ ${description}`, 'green');
      return true;
    } else {
      log(`✗ ${description} - Directory not found: ${dirPath}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ ${description} - Error: ${error.message}`, 'red');
    return false;
  }
}

function validateLuaScript(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for required components
    const checks = [
      { pattern: /local urls = \{/, name: 'URLs configuration' },
      { pattern: /personal = "/, name: 'Personal URL' },
      { pattern: /work = "/, name: 'Work URL' },
      { pattern: /mod\.hyper = \{/, name: 'Hotkey configuration' },
      { pattern: /mod\.key = "/, name: 'Hotkey key' },
      { pattern: /hs\.http\.asyncGet/, name: 'HTTP request functionality' },
      { pattern: /hs\.application\.launchOrFocus/, name: 'App launching functionality' }
    ];
    
    let allPassed = true;
    checks.forEach(check => {
      if (check.pattern.test(content)) {
        log(`  ✓ ${check.name}`, 'green');
      } else {
        log(`  ✗ ${check.name}`, 'red');
        allPassed = false;
      }
    });
    
    return allPassed;
  } catch (error) {
    log(`✗ Error reading Lua script: ${error.message}`, 'red');
    return false;
  }
}

function validateJavaScriptScript(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for required components
    const checks = [
      { pattern: /function doGet\(\)/, name: 'doGet function' },
      { pattern: /function getUnreadEmails/, name: 'getUnreadEmails function' },
      { pattern: /function formatEmailsForAI/, name: 'formatEmailsForAI function' },
      { pattern: /GmailApp\.search/, name: 'Gmail API usage' },
      { pattern: /ContentService/, name: 'Content service output' }
    ];
    
    let allPassed = true;
    checks.forEach(check => {
      if (check.pattern.test(content)) {
        log(`  ✓ ${check.name}`, 'green');
      } else {
        log(`  ✗ ${check.name}`, 'red');
        allPassed = false;
      }
    });
    
    return allPassed;
  } catch (error) {
    log(`✗ Error reading JavaScript script: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🔍 Gmail + Perplexity Integration Setup Validation', 'bright');
  log('=' .repeat(50), 'cyan');
  
  let allChecksPassed = true;
  
  // Check project structure
  log('\n📁 Project Structure:', 'blue');
  allChecksPassed &= checkDirectory('src', 'Source directory');
  allChecksPassed &= checkDirectory('src/hammerspoon', 'Hammerspoon directory');
  allChecksPassed &= checkDirectory('src/apps-script', 'Apps Script directory');
  allChecksPassed &= checkDirectory('docs', 'Documentation directory');
  allChecksPassed &= checkDirectory('examples', 'Examples directory');
  
  // Check core files
  log('\n📄 Core Files:', 'blue');
  allChecksPassed &= checkFile('README.md', 'README file');
  allChecksPassed &= checkFile('LICENSE', 'LICENSE file');
  allChecksPassed &= checkFile('.gitignore', 'Git ignore file');
  allChecksPassed &= checkFile('package.json', 'Package configuration');
  
  // Check source files
  log('\n🔧 Source Files:', 'blue');
  allChecksPassed &= checkFile('src/hammerspoon/automation.lua', 'Hammerspoon automation script');
  allChecksPassed &= checkFile('src/apps-script/personal-gmail-summarizer.js', 'Personal Gmail script');
  allChecksPassed &= checkFile('src/apps-script/work-gmail-summarizer.js', 'Work Gmail script');
  
  // Check documentation
  log('\n📚 Documentation:', 'blue');
  allChecksPassed &= checkFile('docs/setup-guide.md', 'Setup guide');
  allChecksPassed &= checkFile('docs/troubleshooting.md', 'Troubleshooting guide');
  
  // Validate script content
  log('\n🔍 Script Validation:', 'blue');
  
  if (fs.existsSync('src/hammerspoon/automation.lua')) {
    log('Validating Hammerspoon script...', 'yellow');
    allChecksPassed &= validateLuaScript('src/hammerspoon/automation.lua');
  }
  
  if (fs.existsSync('src/apps-script/personal-gmail-summarizer.js')) {
    log('Validating Personal Gmail script...', 'yellow');
    allChecksPassed &= validateJavaScriptScript('src/apps-script/personal-gmail-summarizer.js');
  }
  
  if (fs.existsSync('src/apps-script/work-gmail-summarizer.js')) {
    log('Validating Work Gmail script...', 'yellow');
    allChecksPassed &= validateJavaScriptScript('src/apps-script/work-gmail-summarizer.js');
  }
  
  // Final result
  log('\n' + '=' .repeat(50), 'cyan');
  if (allChecksPassed) {
    log('🎉 All checks passed! Your setup looks good.', 'green');
    log('\nNext steps:', 'blue');
    log('1. Set up Google Apps Script projects', 'yellow');
    log('2. Update URLs in the Hammerspoon script', 'yellow');
    log('3. Install and configure Hammerspoon', 'yellow');
    log('4. Test the integration', 'yellow');
  } else {
    log('❌ Some checks failed. Please review the issues above.', 'red');
    log('\nFor help, see:', 'blue');
    log('- docs/setup-guide.md', 'yellow');
    log('- docs/troubleshooting.md', 'yellow');
  }
  
  process.exit(allChecksPassed ? 0 : 1);
}

// Run the validation
main();

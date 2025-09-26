# Contributing to Gmail + Perplexity Integration

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)

## Code of Conduct

This project follows a code of conduct that ensures a welcoming environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/gmail-perplexity-integration.git
   cd gmail-perplexity-integration
   ```
3. **Set up the development environment** (see [Development Setup](#development-setup))

## Development Setup

### Prerequisites

- macOS (for Hammerspoon development)
- Node.js 16+ (for JavaScript linting and validation)
- Git
- A text editor or IDE

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run validation:**
   ```bash
   npm run validate
   ```

3. **Set up Hammerspoon:**
   - Install Hammerspoon from [hammerspoon.org](https://www.hammerspoon.org/)
   - Copy the example configuration:
     ```bash
     cp config.example.lua config.lua
     ```
   - Update `config.lua` with your settings

4. **Set up Google Apps Script:**
   - Follow the setup guide in `docs/setup-guide.md`
   - Create test projects for development

## Making Changes

### Code Style

#### Lua (Hammerspoon)
- Use 4 spaces for indentation
- Use descriptive variable names
- Add comments for complex logic
- Follow the existing code style

#### JavaScript (Google Apps Script)
- Use 2 spaces for indentation
- Use JSDoc comments for functions
- Follow ESLint configuration
- Use meaningful variable names

#### Documentation
- Use clear, concise language
- Include code examples where helpful
- Update both README and specific docs as needed

### Testing

Before submitting changes:

1. **Test the Hammerspoon script:**
   ```bash
   # Validate Lua syntax
   lua -c src/hammerspoon/automation.lua
   ```

2. **Test JavaScript code:**
   ```bash
   npm run lint
   ```

3. **Run the validation script:**
   ```bash
   npm run validate
   ```

4. **Test functionality:**
   - Test with both personal and work email accounts
   - Verify error handling works correctly
   - Test with various email scenarios (empty inbox, many emails, etc.)

### Areas for Contribution

We welcome contributions in these areas:

- **Bug fixes** - Fix issues reported in GitHub issues
- **New features** - Add new functionality (discuss in issues first)
- **Documentation** - Improve setup guides, troubleshooting, etc.
- **Code quality** - Refactor, optimize, or improve existing code
- **Testing** - Add automated tests or improve manual testing
- **Accessibility** - Improve the UI for better accessibility
- **Performance** - Optimize email processing or UI responsiveness

## Submitting Changes

### Commit Guidelines

Use clear, descriptive commit messages:

```
feat: add support for multiple email accounts
fix: resolve issue with Perplexity app detection
docs: update setup guide with troubleshooting steps
refactor: improve error handling in email processing
```

### Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them thoroughly

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

### Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested on macOS
- [ ] Tested with personal Gmail
- [ ] Tested with work Gmail
- [ ] Tested error scenarios
- [ ] Updated documentation

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

1. **System information:**
   - macOS version
   - Hammerspoon version
   - Perplexity version

2. **Steps to reproduce:**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Error messages:**
   - Exact error text
   - Screenshots if helpful

4. **Logs:**
   - Hammerspoon console output
   - Apps Script execution log

### Feature Requests

For feature requests, please include:

1. **Problem description** - What problem does this solve?
2. **Proposed solution** - How should it work?
3. **Alternatives considered** - What other options were considered?
4. **Additional context** - Any other relevant information

## Pull Request Guidelines

### Review Process

1. **Automated checks** must pass (linting, validation)
2. **Code review** by maintainers
3. **Testing** on different systems/scenarios
4. **Documentation** updates if needed

### Response Time

- We aim to respond to PRs within 48 hours
- Complex changes may take longer to review
- Feel free to ping if no response after a week

### Merge Criteria

PRs will be merged when:
- All automated checks pass
- Code review is approved
- Documentation is updated
- No breaking changes (or properly documented)
- Tests pass

## Development Tips

### Local Development

1. **Use a test Gmail account** for development
2. **Create separate Apps Script projects** for testing
3. **Use the validation script** regularly
4. **Test on different macOS versions** if possible

### Debugging

1. **Enable debug logging** in Hammerspoon
2. **Check Apps Script execution logs**
3. **Use browser developer tools** for web app testing
4. **Test individual components** in isolation

### Performance

1. **Limit email processing** to reasonable amounts
2. **Optimize text cleaning** for large emails
3. **Consider caching** for frequently accessed data
4. **Monitor API usage** and rate limits

## Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Documentation** - Check existing docs first
- **Code comments** - Look for inline documentation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor statistics

Thank you for contributing to make this project better! 🎉

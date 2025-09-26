-- Example configuration file for Gmail + Perplexity integration
-- Copy this file to config.lua and update with your actual URLs

local config = {}

-- Google Apps Script URLs
-- Replace these with your actual deployed Apps Script URLs
config.urls = {
    personal = "https://script.google.com/macros/s/YOUR_PERSONAL_SCRIPT_ID/exec",
    work = "https://script.google.com/macros/s/YOUR_WORK_SCRIPT_ID/exec",
}

-- Hotkey configuration
config.hotkey = {
    modifiers = {"ctrl", "alt", "cmd"},
    key = "y"
}

-- Project paths
config.paths = {
    project = "/Users/anurag/Documents/Gmail + Perplexity",
    output = "/Users/anurag/Documents/Gmail + Perplexity/output.txt"
}

-- Perplexity app configuration
config.perplexity = {
    appName = "Perplexity",
    bundleId = "ai.perplexity.mac",
    delays = {
        focus = 0.6,      -- Delay before focusing Perplexity
        newChat = 0.2,    -- Delay before creating new chat
        paste = 0.1       -- Delay before pasting content
    }
}

-- Notification settings
config.notifications = {
    enabled = true,
    duration = 4  -- seconds
}

return config

-- Example configuration file for Gmail + Perplexity integration
-- Copy this file to config.lua and update with your actual URLs

local config = {}

-- Email account configuration
-- Add as many accounts as needed
config.emailAccounts = {
    {
        id = "personal",
        name = "Personal Mail",
        description = "Summarize top 20 unread from personal inbox",
        url = "https://script.google.com/macros/s/YOUR_PERSONAL_SCRIPT_ID/exec",
        badge = "Personal"
    },
    {
        id = "work",
        name = "Work Mail",
        description = "Summarize top 20 unread from work inbox",
        url = "https://script.google.com/macros/s/YOUR_WORK_SCRIPT_ID/exec",
        badge = "Work"
    },
    -- Add more accounts here as needed
    -- {
    --     id = "client",
    --     name = "Client Mail",
    --     description = "Summarize top 20 unread from client inbox",
    --     url = "https://script.google.com/macros/s/YOUR_CLIENT_SCRIPT_ID/exec",
    --     badge = "Client"
    -- },
    -- {
    --     id = "newsletter",
    --     name = "Newsletter Mail",
    --     description = "Summarize top 20 unread from newsletter inbox",
    --     url = "https://script.google.com/macros/s/YOUR_NEWSLETTER_SCRIPT_ID/exec",
    --     badge = "News"
    -- },
    -- {
    --     id = "sideproject",
    --     name = "Side Project Mail",
    --     description = "Summarize top 20 unread from side project inbox",
    --     url = "https://script.google.com/macros/s/YOUR_SIDEPROJECT_SCRIPT_ID/exec",
    --     badge = "Project"
    -- }
}

-- Hotkey configuration
config.hotkey = {
    modifiers = {"ctrl", "alt", "cmd"},
    key = "y"
}

-- Project paths
config.paths = {
    project = os.getenv("HOME") .. "/Documents/Gmail + Perplexity",
    output = os.getenv("HOME") .. "/Documents/Gmail + Perplexity/output.txt"
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

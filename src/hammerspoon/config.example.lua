-- Example configuration file for Gmail + Perplexity integration
-- Copy this file to config.local.lua and update with your actual URLs

local personalConfig = {
    emailAccounts = {
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
        -- Add more accounts here as needed
        -- {
        --     id = "client",
        --     name = "Client Mail",
        --     description = "Summarize top 20 unread from client inbox",
        --     url = "YOUR_CLIENT_APPS_SCRIPT_URL_HERE",
        --     badge = "Client"
        -- }
    }
}

return personalConfig

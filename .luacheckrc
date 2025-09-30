-- Luacheck configuration for Hammerspoon scripts
std = "lua53"
globals = {
  -- Hammerspoon API
  "hs",
}
files = {
  "src/hammerspoon/**/*.lua",
  "src/hammerspoon/*.lua",
}
ignore = {
  -- allow unused arguments in callbacks
  "211/.*",
}


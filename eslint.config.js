// ESLint v9 flat config
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        // Google Apps Script globals
        Logger: "readonly",
        GmailApp: "readonly",
        UrlFetchApp: "readonly",
        PropertiesService: "readonly",
        ScriptApp: "readonly",
        HtmlService: "readonly",
      },
    },
    files: ["src/apps-script/**/*.js", "src/apps-script/*.js"],
    rules: {
      "no-unused-vars": ["warn", { args: "none" }],
      "no-undef": "error",
      "no-console": "off",
      "prefer-const": "warn",
    },
  },
];



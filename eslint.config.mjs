// ESLint v9 flat config (ESM)
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
        ContentService: "readonly",
        console: "readonly",
      },
    },
    files: ["src/apps-script/**/*.js", "src/apps-script/*.js"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      "no-console": "off",
      "prefer-const": "warn",
      "no-control-regex": "off",
    },
  },
];



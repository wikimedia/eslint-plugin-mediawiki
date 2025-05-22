import globals from "globals";
import eslintPluginEslintPlugin from "eslint-plugin-eslint-plugin";

export default [
  {
    // Main configuration (excluding tests)
    files: ["**/*.js", "!tests/**/*.js"],
    plugins: {
      "eslint-plugin": eslintPluginEslintPlugin,
    },
    languageOptions: {
      ecmaVersion: 2016,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Replicate rules from root .eslintrc.json, adjusting for eslint-plugin-eslint-plugin v6.x
      // Assuming 'all' preset from eslint-plugin-eslint-plugin covers most things.
      // We might need to explicitly import and spread eslintPluginEslintPlugin.configs['flat/all']
      // For now, let's add specific rules we had:
      "eslint-plugin/prefer-message-ids": "off",
      "eslint-plugin/require-meta-docs-description": "off", // This was off
      "eslint-plugin/require-meta-docs-url": "off", // This was off
      "eslint-plugin/test-case-property-ordering": [ "error",
        [ "code", "output", "filename", "options", "languageOptions", "settings", "errors" ] // "parserOptions" changed to "languageOptions"
      ],
      // Add other rules from 'plugin:eslint-plugin/all' if necessary,
      // or use a predefined config like eslintPluginEslintPlugin.configs['flat/all']
    },
  },
  {
    // Configuration for tests directory
    files: ["tests/**/*.js"],
    languageOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
      globals: {
        ...globals.mocha,
        ...globals.node, // Or specific node globals needed for tests
      },
    },
    // Rules specific to tests can be added here if any were implied by wikimedia/mocha
    // For now, it will inherit from a base config if we had one, or just use ESLint defaults.
  },
  // It might be better to use the plugin's predefined configs directly.
  // Example:
  // ...eslintPluginEslintPlugin.configs['flat/all'], // Apply to all files
  // Then override specific rules or apply to specific files.
  // Let's refine the above.
  // Attempting a more structured approach using the plugin's recommended config.

  // Base config for all JS files
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2019, // Default to a more modern version
      sourceType: "module",
      globals: {
        ...globals.node,
      }
    },
  },

  // Config for main src files, using eslint-plugin-eslint-plugin
  {
    files: ["src/**/*.js"],
    plugins: {
      "eslint-plugin": eslintPluginEslintPlugin,
    },
    rules: {
      ...eslintPluginEslintPlugin.configs.recommended.rules, // Start with recommended
      // Override or add specific rules
      "eslint-plugin/prefer-message-ids": "off",
      "eslint-plugin/require-meta-docs-description": "off",
      "eslint-plugin/require-meta-docs-url": "off",
      "eslint-plugin/test-case-property-ordering": [ "error",
        [ "code", "output", "filename", "options", "languageOptions", "settings", "errors" ]
      ],
    }
  },

  // Config for test files
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      }
    },
    // If eslint-plugin-mocha exists and is compatible, it would be configured here.
    // Since wikimedia/mocha was removed, we only have globals.mocha for now.
  }
];

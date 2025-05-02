const eslintPlugin = require("eslint-plugin-eslint-plugin");
const esXPlugin = require("eslint-plugin-es-x");

module.exports = [
	{
		"plugins": {
			"eslint-plugin": eslintPlugin,
			"es-x": esXPlugin
		},
		"rules": {
			// We don't use message ids in our rules
			"eslint-plugin/prefer-message-ids": "off",
			// We don't use the documentation description in our rules
			"eslint-plugin/require-meta-docs-description": "off",
			// We don't use the documentation link in our rules
			"eslint-plugin/require-meta-docs-url": "off",
			// We want consistency in our rules' property ordering, for the documentation
			"eslint-plugin/test-case-property-ordering": ["error",
				["code", "output", "filename", "options", "parserOptions", "settings", "errors"]
			]
		}
	}
];

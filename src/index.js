'use strict';

const packageJson = require( '../package.json' );

const plugin = {
	meta: {
		name: 'eslint-plugin-mediawiki',
		version: packageJson.version
	},
	configs: {},
	rules: {
		'class-doc': require( './rules/class-doc.js' ),
		'msg-doc': require( './rules/msg-doc.js' ),
		'no-extended-unicode-identifiers': require( './rules/no-extended-unicode-identifiers' ),
		'no-nodelist-unsupported-methods': require( './rules/no-nodelist-unsupported-methods' ),
		'no-vue-dynamic-i18n': require( './rules/no-vue-dynamic-i18n.js' ),
		'valid-package-file-require': require( './rules/valid-package-file-require.js' ),
		'vue-exports-component-directive': require( './rules/vue-exports-component-directive.js' )
	},
	processors: {}
};

// We need to assign configs like this to reference ourselves.
Object.assign(
	plugin.configs,
		{
		common: {
			plugins: {
				example: plugin,
			},
			rules: {
				'mediawiki/class-doc': 'error',
				'mediawiki/msg-doc': 'error',
				'mediawiki/no-extended-unicode-identifiers': 'error',
				'mediawiki/no-nodelist-unsupported-methods': 'error',
				'mediawiki/valid-package-file-require': 'error',
			},
		},
		vue: {
			plugins: {
				example: plugin,
			},
			rules: {
				'mediawiki/no-vue-dynamic-i18n': 'error',
				'mediawiki/vue-exports-component-directive': 'error',
			},
		},
	}
);

module.exports = plugin;

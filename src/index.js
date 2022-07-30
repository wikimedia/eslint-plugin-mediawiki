'use strict';

module.exports = {
	rules: {
		'class-doc': require( './rules/class-doc.js' ),
		'msg-doc': require( './rules/msg-doc.js' ),
		'no-extended-unicode-identifiers': require( './rules/no-extended-unicode-identifiers' ),
		'no-nodelist-unsupported-methods': require( './rules/no-nodelist-unsupported-methods' ),
		'no-vue-dynamic-i18n': require( './rules/no-vue-dynamic-i18n.js' ),
		'valid-package-file-require': require( './rules/valid-package-file-require.js' ),
		'vue-exports-component-directive': require( './rules/vue-exports-component-directive.js' )
	},
	configs: {
		common: {
			rules: {
				'mediawiki/class-doc': 'error',
				'mediawiki/msg-doc': 'error',
				'mediawiki/no-extended-unicode-identifiers': 'error',
				'mediawiki/no-nodelist-unsupported-methods': 'error',
				'mediawiki/valid-package-file-require': 'error'
			}
		},
		vue: {
			rules: {
				'mediawiki/no-vue-dynamic-i18n': 'error',
				'mediawiki/vue-exports-component-directive': 'error'
			}
		}
	}
};

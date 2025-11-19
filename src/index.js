'use strict';

module.exports = {
	rules: {
		'class-doc': require( './rules/class-doc.js' ),
		'msg-doc': require( './rules/msg-doc.js' ),
		'no-cookie': require( './rules/no-cookie.js' ),
		'no-extended-unicode-identifiers': require( './rules/no-extended-unicode-identifiers' ),
		'no-nodelist-unsupported-methods': require( './rules/no-nodelist-unsupported-methods' ),
		'no-storage': require( './rules/no-storage.js' ),
		'no-unlabeled-buttonwidget': require( './rules/no-unlabeled-buttonwidget.js' ),
		'no-vue-dynamic-i18n': require( './rules/no-vue-dynamic-i18n.js' ),
		'storage-expiry': require( './rules/storage-expiry.js' ),
		'valid-package-file-require': require( './rules/valid-package-file-require.js' ),
		'vue-exports-component-directive': require( './rules/vue-exports-component-directive.js' )
	},
	configs: {
		common: {
			rules: {
				'mediawiki/class-doc': 'warn',
				'mediawiki/msg-doc': 'warn',
				'mediawiki/no-cookie': 'warn',
				'mediawiki/no-extended-unicode-identifiers': 'error',
				'mediawiki/no-nodelist-unsupported-methods': 'error',
				'mediawiki/no-storage': 'warn',
				'mediawiki/no-unlabeled-buttonwidget': 'warn',
				'mediawiki/storage-expiry': 'warn',
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

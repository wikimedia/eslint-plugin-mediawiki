'use strict';

module.exports = {
	rules: {
		'msg-doc': require( './rules/msg-doc.js' ),
		'valid-package-file-require': require( './lib/rules/valid-package-file-require' )
	}
};

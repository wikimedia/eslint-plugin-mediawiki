'use strict';

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Prohibits non-BMP characters in identifiers, for Safari 11-13 compatibility.'
		},
		schema: [],
		messages: {
			extendedUnicodeIdentifier: 'Non-BMP characters are not allowed in identifiers.'
		}
	},

	create( context ) {
		return {
			Identifier( node ) {
				if ( node.name.match( /[\uD800-\uDFFF]/ ) ) {
					context.report( { node, messageId: 'extendedUnicodeIdentifier' } );
				}
			}
		};
	}
};

'use strict';

module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Require expiry when using mw.storage with a non-literal key.',
			category: 'Best Practices',
			recommended: false
		},
		schema: [],
		messages: {
			missingExpiry: 'When using mw.storage with variable keys, an expiry time is recommended.'
		}
	},
	create( context ) {
		return {
			CallExpression( node ) {
				if (
					node.callee.type === 'MemberExpression' &&
					node.callee.object.type === 'Identifier' &&
					node.callee.object.name === 'mw' &&
					node.callee.property.type === 'Identifier' &&
					node.callee.property.name === 'storage' &&
					node.arguments.length >= 2 &&
					node.arguments[ 0 ].type !== 'Literal' &&
					( node.arguments.length < 3 || ( node.arguments[ 2 ].type === 'Identifier' && node.arguments[ 2 ].name === 'undefined' ) )
				) {
					context.report( {
						node: node,
						messageId: 'missingExpiry'
					} );
				}
			}
		};
	}
};
